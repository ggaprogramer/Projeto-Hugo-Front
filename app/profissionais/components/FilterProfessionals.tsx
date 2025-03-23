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
        interesse: 'todos',
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
        } else if(name === 'interesse') {
            setFormInputs({...formInputs, interesse: value});
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
                        <option value="TODAS">Todas as abordagens</option>
                        <option value="TCC">Terapia Cognitivo-Comportamental (TCC)</option>
                        <option value="PSICANALITICA">Psicoterapia Psicanalítica</option>
                        <option value="HUMANISTA">Terapia Humanista</option>
                        <option value="SISTEMICA">Terapia Sistêmica</option>
                        <option value="COMPORTAMENTAL">Terapia Comportamental</option>
                        <option value="ACT">Terapia de Aceitação e Compromisso (ACT)</option>
                        <option value="DBT">Terapia Dialética Comportamental (DBT)</option>
                        <option value="GESTALT">Terapia Gestalt</option>
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
                        <option value="TODAS">Todas as especialidades</option>
                        <option value="PSICOLOGIA_CLINICA">Psicologia Clínica</option>
                        <option value="PSICOLOGIA_ORGANIZACIONAL">Psicologia Organizacional</option>
                        <option value="PSICOLOGIA_ESCOLAR">Psicologia Escolar</option>
                        <option value="PSICOLOGIA_JURIDICA">Psicologia Jurídica</option>
                        <option value="NEUROPSICOLOGIA">Neuropsicologia</option>
                        <option value="PSICOTERAPIA">Psicoterapia</option>
                        <option value="PSICOLOGIA_SOCIAL">Psicologia Social</option>
                        <option value="PSICOLOGIA_DA_SAUDE">Psicologia da Saúde</option>
                        <option value="PSICOLOGIA_INFANTIL">Psicologia Infantil</option>
                        <option value="PSICOLOGIA_EDUCACIONAL">Psicologia Educacional</option>
                    </select>
                </div>
                <div className='filtro-interesse'>
                    <p>Interesse:</p>
                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormInputs('interesse', e.target.value)} 
                    value={formInputs.interesse} name="interesse" id="interesse">
                        <option value="TODOS">Todos os interesses</option>
                        <option value="TERAPIA">Terapia</option>
                        <option value="PSICOLOGIA">Psicologia</option>
                        <option value="TERAPIA_COGNITIVO_COMPORTAMENTAL">Terapia Cognitivo Comportamental</option>
                        <option value="PSICOTERAPIA">Psicoterapia</option>
                        <option value="TERAPIA_EMOCIONAL">Terapia Emocional</option>
                        <option value="SAUDE_MENTAL">Saúde Mental</option>
                        <option value="ANSIEDADE">Ansiedade</option>
                        <option value="DEPRESSAO">Depressão</option>
                        <option value="RELACIONAMENTOS">Relacionamentos</option>
                        <option value="AUTOESTIMA">Autoestima</option>
                        <option value="MINDFULNESS">Mindfulness</option>
                        <option value="ESTRESSE">Estresse</option>
                        <option value="TRAUMA">Trauma</option>
                        <option value="ADOLESCENCIA">Adolescência</option>
                        <option value="PSICANALISE">Psicanálise</option>
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