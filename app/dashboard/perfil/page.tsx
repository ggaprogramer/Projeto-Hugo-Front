'use client';

import { FaPencilAlt } from "react-icons/fa";
import './styles/perfil.scss';
import { IMaskInput } from 'react-imask';
import DivInterestsAtualizarPerfil from './components/DivInterestsAtualizarPerfil';
import Link from 'next/link';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {RegisterFormAtualizarValues} from './interfaces';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth'

export default function Perfil(){
    const formRegister = useRef<HTMLFormElement>(null);
    const [formInputs, setFormInputs] = useState<RegisterFormAtualizarValues>({
        name: '',
        username: '',
        email: '',
        interests: [],
        gender: '',
        phone: '',
        dateBirth: '',
        password: '',
        password1: '',
        password2: '',
        typeProfile: 'PROFILE',
    });
    const [errors, setErrors] = useState<Errors[]>([]);

    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const [stateUpgrade, setStateUpgrade] = useState<Number>(0);

    const calcularIdade = (dataNascimento: string) => {
        const hoje = new Date(); // Data atual
        const nascimento = new Date(dataNascimento); // Data de nascimento
    
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
    
        // Verifica se ainda não fez aniversário este ano
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
    
        return idade;
    }

    const handleViewPassword = () => {
        setViewPassword((viewPassword) => viewPassword ? false : true);
    }

    console.log(formInputs);
    console.log(errors);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors: Errors[] = [];
        let lenErrors: number = 0;
        if(formInputs && 
            !formInputs.name && 
            !formInputs.username && 
            !formInputs.email && 
            !formInputs.gender && 
            formInputs.interests.length === 0  &&
            !formInputs.phone &&
            !formInputs.dateBirth &&
            !formInputs.password &&
            !formInputs.password1 &&
            !formInputs.password2
        ){
            errors.push({type: 'system', description: 'O formulário inteiro não pode ficar vazio.'});
            lenErrors+=1;
        }

        if(formInputs && formInputs.username && formInputs.username.length < 5){
            errors.push({type: 'username', description: 'O nome do usuário deve ter no mínimo 5 caracteres.'});
            lenErrors+=1;
        }

        if(formInputs && formInputs.dateBirth){
            let age: number = calcularIdade(formInputs.dateBirth);
            if(age < 15){
                errors.push({type: 'date-birth', description: 'Você precisa ter no mínimo 15 anos para poder acessar a plataforma.'});
                lenErrors+=1;
            }
        }
        
        if(formInputs && formInputs.password1 && formInputs.password2 && formInputs.password1 != formInputs.password2){
            errors.push({type: 'password1', description: 'As senhas tem que ser iguais.'});
            lenErrors+=1;
        }
        if(formInputs && formInputs.password1 && formInputs.password2 && formInputs.password1.length < 8){
            errors.push({type: 'password1', description: 'A senha precisa ter no mínimo 8 caracteres.'});
            lenErrors+=1;
        }
        if(lenErrors > 0){
            errors.push({type: 'lenErrors', description: lenErrors + ''});
        } 
        setErrors(errors);
        if(errors.length === 0) makeUpgrade();
    }

    const makeUpgrade = () => {
        
    }

    return (
        <>
            <div className="perfil">
                <div className="perfil-cabecalho">
                    <h1>
                        Meu Perfil
                    </h1>
                    <button onClick={() => setStateUpgrade(1)}>
                        <FaPencilAlt/>
                        Alterar Dados
                    </button>
                </div>
                <div className="perfil-box">
                    <div className="perfil-foto">
                        <img src="/user.png" alt="" />
                        <h2>
                            John Doe
                        </h2>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Nome: 
                            </p>
                            <strong>
                                Guilherme
                            </strong>
                        </div>
                        <div>
                            <p>
                                E-mail: 
                            </p>
                            <strong>
                                email@gmail.com
                            </strong>
                        </div>
                        <div>
                            <p>
                                Celular: 
                            </p>
                            <strong>
                                +55 11 11111-1111
                            </strong>
                        </div>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Usuário: 
                            </p>
                            <strong>
                                username
                            </strong>
                        </div>
                        <div>
                            <p>
                                Aniversário: 
                            </p>
                            <strong>
                                11/03/2001
                            </strong>
                        </div>
                        <div>
                            <p>
                                Confirmação de e-mail: 
                            </p>
                            <strong>
                                <img src="/check.png" alt="" />
                            </strong>
                        </div>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Sexo: 
                            </p>
                            <strong>
                                masculino
                            </strong>
                        </div>
                        <div>
                            <p>
                                Interesses: 
                            </p>
                            <strong>
                                Jogos, Artes
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            {stateUpgrade === 1 &&
            <form ref={formRegister} className="alterar-perfil" onSubmit={handleSubmit}>
                <h2>
                    Alterar Perfil
                </h2>
                <div className="alterar-perfil-box">
                    <div>
                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="name" id="name" />
                            <ErrorAuth errors={errors} type='name'/>
                        </div>
                        <div>
                            <label htmlFor="username">Usuário:</label>
                            <input type="text" name="username" id="username" />
                            <ErrorAuth errors={errors} type='username'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" />
                            <ErrorAuth errors={errors} type='email'/>
                        </div>
                        <div>
                            <label htmlFor="phone">Celular:</label>
                            <IMaskInput
                                id='phone'
                                name='phone'
                                mask="+55 (00) 00000-0000"
                            />
                            <ErrorAuth errors={errors} type='phone'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender">
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                            <ErrorAuth errors={errors} type='sexo'/>
                        </div>
                        <div>
                            <label htmlFor="dateBirth">Aniversário:</label>
                            <input type="date" name="dateBirth" id="dateBirth" />
                            <ErrorAuth errors={errors} type='dateBirth'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Interesses:</p>
                            <DivInterestsAtualizarPerfil
                            formRegister={formRegister}
                            formInputs={formInputs}
                            setFormInputs={setFormInputs}
                            errors={errors}/>
                            <ErrorAuth errors={errors} type='interests'/>
                        </div>
                    </div>
                    <h3>
                        Mudar a senha
                    </h3>
                    <div>
                        <div>
                            <label htmlFor="password">Senha antiga:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password" id="password" />
                        </div>
                        <ErrorAuth errors={errors} type='password'/>
                        <div>
                            <label htmlFor="password1">Nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password1" id="password1" />
                        </div>
                        <ErrorAuth errors={errors} type='password1'/>
                        <div>
                            <label htmlFor="password2">Repetir nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password2" id="password2" />
                        </div>
                        <ErrorAuth errors={errors} type='password2'/>
                    </div>
                    <label className='inputs-extras'>
                        <input onChange={handleViewPassword} type="checkbox"/>
                        <p>
                            Mostrar senhas.
                        </p>
                    </label>
                    <div className="erros-gerais">
                        <ErrorAuth errors={errors} type='lenErrors'/>
                        <ErrorAuth errors={errors} type='system'/>
                    </div>
                    <div className="botoes">
                        <button onClick={() => setStateUpgrade(0)}>Cancelar</button>
                        <button type="submit">Salvar alterações</button>
                    </div>
                </div>
            </form>
            }
        </>
    )
}