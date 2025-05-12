"use client";

import { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FiltersProfessionals, GeneroFiltersProfessionals, DisponibilidadeFiltersProfessionals, OptionsFiltersInterface, 
    BodyProfessionalFilter, ControlProfessionals} from '../interfaces';
import DivMultipleSelectProfissional from './DivMultipleSelectProfissional';
import {approachesInterface, specialtiesInterface, languagesInterface, ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';
import {interestsInterface} from '@auth/register/interfaces';
import extractProfessionalInterests from '@auth/register/functions/extractProfessionalInterests';
import extractProfessionalApproaches from '@dashboard/profissional/functions/extractProfessionalApproaches';
import extractProfessionalSpecialties from '@dashboard/profissional/functions/extractProfessionalSpecialties';
import extractProfessionalLanguages from '@dashboard/profissional/functions/extractProfessionalLanguages';
import {ProfessionalInfo} from '@dashboard/profissional/interfaces';
import '../styles/filters-professionals.scss';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth'

export default function FilterProfessionals(props: {control: ControlProfessionals, setControl: Function}){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;

    const [optionsFilters, setOptionsFilters] = useState<OptionsFiltersInterface>({
        interesses: [],
        abordagens: [],
        especialidades: [],
        idiomas: [],
    });

    const [errors, setErrors] = useState<Errors[]>([]);

    const buttonSubmit = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    const viewLoader = () => {
        buttonSubmit?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }
    const disableLoader = () => {
        buttonSubmit?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }

    useEffect(() => {
        const extractOptionsFiltersFunction = async () => {
            const interesses: interestsInterface[] = await extractProfessionalInterests();
            const abordagens: approachesInterface[] = await extractProfessionalApproaches();
            const especialidades: specialtiesInterface[] = await extractProfessionalSpecialties();
            const languages: languagesInterface[] = await extractProfessionalLanguages();
            setOptionsFilters({
                ...optionsFilters,
                interesses: interesses,
                abordagens: abordagens,
                especialidades: especialidades,
                idiomas: languages,
            });
        };
        extractOptionsFiltersFunction();
    }, []);

    useEffect(() => {
        const reloadFilter = async () => {
            await makeFilter();
        };
        reloadFilter();
    }, [props.control.pageSelected, props.control.pageSize]);

    const [formInputs, setFormInputs] = useState<FiltersProfessionals>({
        nome: '',
        abordagens: [],
        precoMinimo: '',
        precoMaximo: '',
        especialidades: [],
        interesses: [],
        idiomas: [],
        genero: 'TODOS',
        disponibilidades: ['TODOS'],
    });

    const formAtualizar = useRef<HTMLFormElement>(null);

    const handleFormInputs = (name: string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target as HTMLInputElement;

        if(name === 'nome') {
            setFormInputs({...formInputs, nome: input.value});
        } else if(name === 'preco-minimo') {
            setFormInputs({...formInputs, precoMinimo: input.value});
        } else if(name === 'preco-maximo') {
            setFormInputs({...formInputs, precoMaximo: input.value});
        } else if(name === 'genero') {
            setFormInputs({...formInputs, genero: input.value as GeneroFiltersProfessionals});
        } else if(name === 'disponibilidade') {
            let disponibilidades: string[] = [];
            if(input.checked){
                if(input.value === 'TODOS'){
                    disponibilidades = ['TODOS'];
                } else {
                    disponibilidades = formInputs.disponibilidades.filter(disponibilidade => disponibilidade !== 'TODOS');
                    disponibilidades.push(input.value); 
                }  
            } else {
                if(formInputs.disponibilidades.length === 1) {
                    disponibilidades = ['TODOS'];
                } else {
                    disponibilidades = formInputs.disponibilidades.filter(disponibilidade => disponibilidade !== input.value);
                }
            }
            setFormInputs({...formInputs, disponibilidades: disponibilidades as DisponibilidadeFiltersProfessionals[]});
        }
    }

    const verifyNumberInput = (value: string, name: string) => {
        const regex = /^\d{1,10}(\.|\,)?\d{0,2}$/;
        if(name === 'preco-minimo') {
            if(regex.test(value)){
                setFormInputs({...formInputs, precoMinimo: value});
            } else {
                setFormInputs({...formInputs, precoMinimo: ''});
            }
        } else if(name === 'preco-maximo') {
            if(regex.test(value)){
                setFormInputs({...formInputs, precoMaximo: value});
            } else {
                setFormInputs({...formInputs, precoMaximo: ''});
            }
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await makeFilter();
    }

    const makeFilter = async () => {
        const body: BodyProfessionalFilter = {
            pagina: props.control.pageSelected,
            tamanho: props.control.pageSize,
            ordenarPor: "name",
            direcao: "ASC",
            nome: formInputs.nome ? formInputs.nome : "",
            abordagens: formInputs.abordagens.map(abordagens => abordagens.value),
            precoMinimo: formInputs.precoMinimo ? parseFloat(formInputs.precoMinimo) : 0.0,
            precoMaximo: formInputs.precoMaximo ? parseFloat(formInputs.precoMaximo) : 0.0,
            especialidades: formInputs.especialidades.map(especialidades => especialidades.value),
            interesses: formInputs.interesses.map(interests => interests.value),
            idiomas: formInputs.idiomas.map(idiomas => idiomas.value),
            genero: formInputs.genero,
            disponibilidades: formInputs.disponibilidades,
        }

        let errors: Errors[] = [];
        try{
            viewLoader();
            const response = await fetch(`${urlBack}/professional/filter`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + '',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            if(!response.ok){
                disableLoader();
                errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
                setErrors(errors);
            }
            else{
                disableLoader();
                const json = await response.json();
                const data: ProfessionalAnyInterface[] = json.content; 
                props.setControl({...props.control, 
                    professionalAny: data, 
                    totalElements: json.totalElements, 
                    pageSelected: json.pageable.pageNumber, 
                    pageSize: json.size,
                    totalPages: json.totalPages});
                setErrors([]);
            } 
        } catch{
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
            setErrors(errors);
        }
    }

    return (
        <>
            {
                optionsFilters.abordagens?.length !== 0 &&
                optionsFilters.especialidades?.length !== 0 &&
                optionsFilters.interesses?.length !== 0 &&
                optionsFilters.idiomas?.length !== 0
                ?
                <form ref={formAtualizar} onSubmit={handleSubmit} className='filtros'>
                    <div className='aba-filtros'>
                        <div className='filtro-nome'>
                            <label htmlFor="nome">Busca por nome:</label>
                            <div>
                                <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('nome', e)} 
                                type="text" name='nome' id='nome' placeholder='Nome do profissional' value={formInputs.nome} />
                                <label htmlFor="nome">
                                    <img src="/lupa.png" alt="" />
                                </label>
                            </div>
                        </div>
                        {
                            optionsFilters.abordagens?.length !== 0 && 
                            <div className='filtro-abordagem'>
                                <p>Abordagem terapêutica:</p>
                                <DivMultipleSelectProfissional
                                    formInputs={formInputs}
                                    formAtualizar={formAtualizar}
                                    setFormInputs={setFormInputs}
                                    options={optionsFilters.abordagens}
                                    formInputsName='abordagens'
                                    formOptions={formInputs.abordagens}
                                />
                            </div>
                        }
                        <div className='filtro-preco'>
                            <p>Faixa de preço:</p>
                            <div>
                                <input onInput={(e) => verifyNumberInput((e.target as HTMLInputElement).value, 'preco-minimo')}
                                value={formInputs.precoMinimo} type="text" name='preco-minimo' id='preco-minimo' placeholder='Mínimo' />
                                <input onInput={(e) => verifyNumberInput((e.target as HTMLInputElement).value, 'preco-maximo')}
                                value={formInputs.precoMaximo} type="text" name='preco-maximo' id='preco-maximo' placeholder='Máximo' />
                            </div>
                        </div>
                        <div className='filtro-genero'>
                            <p>Gênero do profissional:</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='todos-generos' value='TODOS' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='genero-feminino' value='FEMININO' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='genero-masculino' value='MASCULINO' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='genero-outros' value='OUTROS' />
                            <div>
                                {
                                    formInputs.genero === 'TODOS' 
                                    ? 
                                    <label className='selected' htmlFor="todos-generos">Todos</label>
                                    :
                                    <label htmlFor="todos-generos">Todos</label>
                                }
                                {
                                    formInputs.genero === 'MASCULINO' 
                                    ? 
                                    <label className='selected' htmlFor="genero-masculino">Masculino</label>
                                    :
                                    <label htmlFor="genero-masculino">Masculino</label>
                                }
                                {
                                    formInputs.genero === 'FEMININO' 
                                    ? 
                                    <label className='selected' htmlFor="genero-feminino">Feminino</label>
                                    :
                                    <label htmlFor="genero-feminino">Feminino</label>
                                }
                                {
                                    formInputs.genero === 'OUTROS' 
                                    ? 
                                    <label className='selected' htmlFor="genero-outros">Outros</label>
                                    :
                                    <label htmlFor="genero-outros">Outros</label>
                                }
                            </div>
                        </div>
                        {
                            optionsFilters.especialidades?.length !== 0 && 
                            <div className='filtro-especialidade'>
                                <p>Especialidade:</p>
                                <DivMultipleSelectProfissional
                                    formInputs={formInputs}
                                    formAtualizar={formAtualizar}
                                    setFormInputs={setFormInputs}
                                    options={optionsFilters.especialidades}
                                    formInputsName='especialidades'
                                    formOptions={formInputs.especialidades}
                                />
                            </div>
                        }
                        {
                            optionsFilters.interesses?.length !== 0 && 
                            <div className='filtro-interesse'>
                                <p>Interesse:</p>
                                <DivMultipleSelectProfissional
                                    formInputs={formInputs}
                                    formAtualizar={formAtualizar}
                                    setFormInputs={setFormInputs}
                                    options={optionsFilters.interesses}
                                    formInputsName='interesses'
                                    formOptions={formInputs.interesses}
                                />
                            </div>
                        }
                        {
                            optionsFilters.idiomas?.length !== 0 && 
                            <div className='filtro-idiomas'>
                                <p>Idiomas:</p>
                                <DivMultipleSelectProfissional
                                    formInputs={formInputs}
                                    formAtualizar={formAtualizar}
                                    setFormInputs={setFormInputs}
                                    options={optionsFilters.idiomas}
                                    formInputsName='idiomas'
                                    formOptions={formInputs.idiomas}
                                />
                            </div>
                        }
                        <div className='filtro-disponilidade'>
                            <p>Disponibilidade:</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="checkbox" name='disponibilidade' id='disponibilidade-todos' value='TODOS' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="checkbox" name='disponibilidade' id='disponibilidade-manha' value='MANHA' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="checkbox" name='disponibilidade' id='disponibilidade-tarde' value='TARDE' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="checkbox" name='disponibilidade' id='disponibilidade-noite' value='NOITE' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="checkbox" name='disponibilidade' id='disponibilidade-fim-de-semana' value='FDS' />
                            <div>
                                {
                                    formInputs.disponibilidades.indexOf('TODOS') !== -1 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-todos">Todos</label>
                                    :
                                    <label htmlFor="disponibilidade-todos">Todos</label>
                                }
                                {
                                    formInputs.disponibilidades.indexOf('MANHA') !== -1 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-manha">Manhã</label>
                                    :
                                    <label htmlFor="disponibilidade-manha">Manhã</label>
                                }
                                {
                                    formInputs.disponibilidades.indexOf('TARDE') !== -1 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-tarde">Tarde</label>
                                    :
                                    <label htmlFor="disponibilidade-tarde">Tarde</label>
                                }
                                {
                                    formInputs.disponibilidades.indexOf('NOITE') !== -1 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-noite">Noite</label>
                                    :
                                    <label htmlFor="disponibilidade-noite">Noite</label>
                                }
                                {
                                    formInputs.disponibilidades.indexOf('FDS') !== -1 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-fim-de-semana">Fim de semana</label>
                                    :
                                    <label htmlFor="disponibilidade-fim-de-semana">Fim de semana</label>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='filtros-buttons'>
                        <button>Limpar filtros</button>
                        <button ref={buttonSubmit} type='submit'>Filtrar resultados</button>
                        <span ref={loader} className='loader'></span>
                    </div>
                    <ErrorAuth errors={errors} type='system'/>
                </form>
                :
                <span className='loader-filters'></span>
            }
        </>
    )
}