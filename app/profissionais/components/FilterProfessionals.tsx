"use client";

import { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FiltersProfessionals, GeneroFiltersProfessionals, DisponibilidadeFiltersProfessionals, OptionsFiltersInterface} from '../interfaces';
import DivMultipleSelectProfissional from './DivMultipleSelectProfissional';
import {approachesInterface, specialtiesInterface, languagesInterface} from '@dashboard/profissional/interfaces';
import {interestsInterface} from '@auth/register/interfaces';
import extractProfessionalInterests from '@auth/register/functions/extractProfessionalInterests';
import extractProfessionalApproaches from '@dashboard/profissional/functions/extractProfessionalApproaches';
import extractProfessionalSpecialties from '@dashboard/profissional/functions/extractProfessionalSpecialties';
import extractProfessionalLanguages from '@dashboard/profissional/functions/extractProfessionalLanguages';

export default function FilterProfessionals(){

    const [optionsFilters, setOptionsFilters] = useState<OptionsFiltersInterface>({
        interesses: [],
        abordagens: [],
        especialidades: [],
        idiomas: [],
    });

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

    const [formInputs, setFormInputs] = useState<FiltersProfessionals>({
        nome: '',
        abordagens: [],
        precoMinimo: '',
        precoMaximo: '',
        especialidades: [],
        interesses: [],
        idiomas: [],
        genero: 'T',
        disponibilidade: 'TO',
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
            setFormInputs({...formInputs, disponibilidade: input.value as DisponibilidadeFiltersProfessionals});
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                                type="radio" name='genero' id='todos-generos' value='T' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='genero-feminino' value='F' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e)}
                                type="radio" name='genero' id='genero-masculino' value='M' />
                            <div>
                                {
                                    formInputs.genero === 'T' 
                                    ? 
                                    <label className='selected' htmlFor="todos-generos">Todos</label>
                                    :
                                    <label htmlFor="todos-generos">Todos</label>
                                }
                                {
                                    formInputs.genero === 'F' 
                                    ? 
                                    <label className='selected' htmlFor="genero-feminino">Feminino</label>
                                    :
                                    <label htmlFor="genero-feminino">Feminino</label>
                                }
                                {
                                    formInputs.genero === 'M' 
                                    ? 
                                    <label className='selected' htmlFor="genero-masculino">Masculino</label>
                                    :
                                    <label htmlFor="genero-masculino">Masculino</label>
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
                                type="radio" name='disponibilidade' id='disponibilidade-todos' value='TO' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="radio" name='disponibilidade' id='disponibilidade-manha' value='MA' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="radio" name='disponibilidade' id='disponibilidade-tarde' value='TA' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="radio" name='disponibilidade' id='disponibilidade-noite' value='NO' />
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e)}
                                type="radio" name='disponibilidade' id='disponibilidade-fim-de-semana' value='FDS' />
                            <div>
                                {
                                    formInputs.disponibilidade === 'TO' 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-todos">Todos</label>
                                    :
                                    <label htmlFor="disponibilidade-todos">Todos</label>
                                }
                                {
                                    formInputs.disponibilidade === 'MA' 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-manha">Manhã</label>
                                    :
                                    <label htmlFor="disponibilidade-manha">Manhã</label>
                                }
                                {
                                    formInputs.disponibilidade === 'TA' 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-tarde">Tarde</label>
                                    :
                                    <label htmlFor="disponibilidade-tarde">Tarde</label>
                                }
                                {
                                    formInputs.disponibilidade === 'NO' 
                                    ? 
                                    <label className='selected' htmlFor="disponibilidade-noite">Noite</label>
                                    :
                                    <label htmlFor="disponibilidade-noite">Noite</label>
                                }
                                {
                                    formInputs.disponibilidade === 'FDS' 
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
                        <button type='submit'>Filtrar resultados</button>
                    </div>
                </form>
                :
                <span className='loader-filters'></span>
            }
        </>
    )
}