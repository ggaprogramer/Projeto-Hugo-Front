"use client";

import { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FiltersProfessionals, GeneroFiltersProfessionals, DisponibilidadeFiltersProfessionals} from '../interfaces';
import { IMaskInput } from 'react-imask';

export default function FilterProfessionals(){

    const [formInputs, setFormInputs] = useState<FiltersProfessionals>({
        nome: '',
        abordagem: 'todas',
        precoMinimo: '',
        precoMaximo: '',
        especialidade: 'todas',
        genero: 'T',
        disponibilidade: 'TO',
    });

    const handleFormInputs = (name: string, value: string | GeneroFiltersProfessionals | DisponibilidadeFiltersProfessionals) => {
        if(name === 'nome') {
            setFormInputs({...formInputs, nome: value});
        } else if(name === 'abordagem') {
            setFormInputs({...formInputs, abordagem: value});
        } else if(name === 'preco-minimo') {
            setFormInputs({...formInputs, precoMinimo: value});
        } else if(name === 'preco-maximo') {
            setFormInputs({...formInputs, precoMaximo: value});
        } else if(name === 'especialidade') {
            setFormInputs({...formInputs, especialidade: value});
        } else if(name === 'genero') {
            setFormInputs({...formInputs, genero: value as GeneroFiltersProfessionals});
        } else if(name === 'disponibilidade') {
            setFormInputs({...formInputs, disponibilidade: value as DisponibilidadeFiltersProfessionals});
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
        console.log('submit');
    }

    console.log(formInputs);

    return (
        <form onSubmit={handleSubmit} className='filtros'>
            <div className='aba-filtros'>
                <div className='filtro-nome'>
                    <label htmlFor="nome">Busca por nome:</label>
                    <div>
                        <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('nome', e.target.value)} 
                        type="text" name='nome' id='nome' placeholder='Nome do profissional' value={formInputs.nome} />
                        <label htmlFor="nome">
                            <img src="/lupa.png" alt="" />
                        </label>
                    </div>
                </div>
                <div className='filtro-abordagem'>
                    <p>Abordagem terapêutica:</p>
                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormInputs('abordagem', e.target.value)} 
                    value={formInputs.abordagem} name="abordagem" id="abordagem">
                        <option value="todas">Todas as abordagens</option>
                        <option value="tcc">Terapia Cognitivo-Comportamental (TCC)</option>
                        <option value="psicanalítica">Psicoterapia Psicanalítica</option>
                        <option value="humanista">Terapia Humanista</option>
                        <option value="sistemica">Terapia Sistêmica</option>
                        <option value="comportamental">Terapia Comportamental</option>
                        <option value="act">Terapia de Aceitação e Compromisso (ACT)</option>
                        <option value="dbt">Terapia Dialética Comportamental (DBT)</option>
                        <option value="gestalt">Terapia Gestalt</option>
                    </select>
                </div>
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
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e.target.value)}
                        type="radio" name='genero' id='todos-generos' value='T' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e.target.value)}
                        type="radio" name='genero' id='genero-feminino' value='F' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('genero', e.target.value)}
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
                <div className='filtro-especialidade'>
                    <p>Especialidade:</p>
                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormInputs('especialidade', e.target.value)} 
                    value={formInputs.especialidade} name="especialidade" id="especialidade">
                        <option value="todas">Todas as especialidades</option>
                        <option value="psicologia_clinica">Psicologia Clínica</option>
                        <option value="psicologia_organizacional">Psicologia Organizacional</option>
                        <option value="psicologia_escolar">Psicologia Escolar</option>
                        <option value="psicologia_juridica">Psicologia Jurídica</option>
                        <option value="neuropsicologia">Neuropsicologia</option>
                        <option value="psicoterapia">Psicoterapia</option>
                        <option value="psicologia_social">Psicologia Social</option>
                        <option value="psicologia_da_saude">Psicologia da Saúde</option>
                        <option value="psicologia_infantil">Psicologia Infantil</option>
                        <option value="psicologia_educacional">Psicologia Educacional</option>
                    </select>
                </div>
                <div className='filtro-disponilidade'>
                    <p>Disponibilidade:</p>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e.target.value)}
                        type="radio" name='disponibilidade' id='disponibilidade-todos' value='TO' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e.target.value)}
                        type="radio" name='disponibilidade' id='disponibilidade-manha' value='MA' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e.target.value)}
                        type="radio" name='disponibilidade' id='disponibilidade-tarde' value='TA' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e.target.value)}
                        type="radio" name='disponibilidade' id='disponibilidade-noite' value='NO' />
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('disponibilidade', e.target.value)}
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
    )
}