"use client";

import '../style.scss';
import '@auth/styles/style.scss';
import Link from 'next/link';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import InputForm from '../components/InputForm';
import SelectForm from '../components/SelectForm';
import DivInterestsForm from '../components/DivInterestsForm';
import PasswordInputForm from '../components/PasswordInputForm';
import {RegisterFormValues} from '../interfaces';
import {Errors} from '../../interfaces';
import ErrorAuth from '../../components/ErrorAuth'
import { useRouter } from 'next/navigation';
import {responseRegisterForm, bodyRequestRegisterForm, TypeProfile, Roles} from '@auth/register/interfaces';

export default function RegisterPage() {
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;

    const router = useRouter();

    const buttonRegister = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    const viewLoader = () => {
        buttonRegister?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }
    const disableLoader = () => {
        buttonRegister?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }

    const [etapasForm, setEtapasForm] = useState(1);
    const [errors, setErrors] = useState<Errors[]>([]);

    const [formInputs, setFormInputs] = useState<RegisterFormValues>({
        name: '',
        username: '',
        email: '',
        interests: [],
        gender: '',
        phone: '',
        dateBirth: '',
        password1: '',
        password2: '',
        termos: false,
        typeProfile: 'PROFILE',
    });
    const formRegister = useRef<HTMLFormElement>(null);

    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const makeRegister = async () => {
        try{
            const roles = ['USER'] as Roles[];
            roles.push(formInputs.typeProfile);
            const body: bodyRequestRegisterForm = {
                name: formInputs.name,
                username: formInputs.username,
                password1: formInputs.password1,
                password2: formInputs.password2,
                email: formInputs.email,
                roles: roles,
                phone: formInputs.phone,
                dateBirth: formInputs.dateBirth,
                interests: formInputs.interests,
                gender: formInputs.gender,
                typeProfile: formInputs.typeProfile,
            }
            viewLoader();
            const response = await fetch(`${urlBack}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data: responseRegisterForm = await response.json();
            if(data.status === 'ERROR' && data.type){
                errors.push({type: data.type, description: data.message});
                errors.push({type: 'lenErrors', description: '1'});
                disableLoader();
            }
            else if(data.status === 'SUCCESS'){
                // TODO enviar uma mensagem de sucesso pra página de login
                router.push('/auth/login');
            } else{
                disableLoader();
            }
        } catch{
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
        }
    }

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors: Errors[] = [];
        if(etapasForm == 1){
            setEtapasForm((etapasForm) => etapasForm + 1);
        } else if(etapasForm == 2){
            let lenErrors: number = 0;
            if(formInputs && !formInputs.name){
                errors.push({type: 'name', description: 'Nenhum nome foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.username){
                errors.push({type: 'username', description: 'Nenhum usuário foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && formInputs.username && formInputs.username.length < 5){
                errors.push({type: 'username', description: 'O nome do usuário deve ter no mínimo 5 caracteres.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.email){
                errors.push({type: 'email', description: 'Nenhum e-mail foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.gender){
                errors.push({type: 'gender', description: 'Nenhum gênero foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && formInputs.interests.length === 0){
                errors.push({type: 'interests', description: 'Nenhum interesse foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.phone){
                errors.push({type: 'phone', description: 'Nenhum número de celular foi enviado.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.dateBirth){
                errors.push({type: 'date-birth', description: 'Nenhuma data de aniversário foi enviada.'});
                lenErrors+=1;
            } else {
                let age: number = calcularIdade(formInputs.dateBirth);
                if(age < 15){
                    errors.push({type: 'date-birth', description: 'Você precisa ter no mínimo 15 anos para poder acessar a plataforma.'});
                    lenErrors+=1;
                }
            }
            
            if(formInputs && !formInputs.password1){
                errors.push({type: 'password1', description: 'A primeira senha não foi enviada'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.password2){
                errors.push({type: 'password2', description: 'A segunda senha não foi enviada'});
                lenErrors+=1;
            }
            if(formInputs && formInputs.password1 && formInputs.password2 && formInputs.password1 != formInputs.password2){
                errors.push({type: 'password1', description: 'As senhas tem que ser iguais.'});
                lenErrors+=1;
            }
            if(formInputs && formInputs.password1 && formInputs.password2 && formInputs.password1.length < 8){
                errors.push({type: 'password1', description: 'A senha precisa ter no mínimo 8 caracteres.'});
                lenErrors+=1;
            }
            if(formInputs && !formInputs.termos){
                errors.push({type: 'termos', description: 'Para criar a conta, você precisa aceitar os termos.'});
                lenErrors+=1;
            }
            if(lenErrors > 0){
                errors.push({type: 'lenErrors', description: lenErrors + ''});
            } 
            setErrors(errors);
            if(errors.length === 0) makeRegister();
        } else{
            setEtapasForm(1);
        }
    };

    const handleBtnVoltar = () => {
        setEtapasForm(1);
    };

    const handleViewPassword = () => {
        setViewPassword((viewPassword) => viewPassword ? false : true);
    }

    const handleTypeProfile = (e: React.ChangeEvent<HTMLInputElement>) => [
        setFormInputs({...formInputs, typeProfile: e.target.value as TypeProfile})
    ]

    return (
        <form ref={formRegister} className='auth-form' onSubmit={handleSubmit}>
            <h2 className='title-secoundary title-auth'>
                <img src="/logo.png" 
                alt="Registro - Terapia" />
                Registro {etapasForm === 1 ? '(1/2)' : '(2/2)'}
            </h2>
            {
                etapasForm === 1
                ?
                <>
                    <div className='inputs-type-profile'>
                        <p>Escolha uma das opções abaixo:</p>
                        <div>
                            <input onChange={handleTypeProfile} type="radio" 
                            name='type-profile' id='t-professional' value='PROFESSIONAL'/>
                            <input onChange={handleTypeProfile} type="radio" 
                            name='type-profile' id='t-profile' value='PROFILE'/>
                            {
                                formInputs.typeProfile === 'PROFESSIONAL'
                                ?
                                <label className='selected' htmlFor="t-professional">Sou um profissional</label>
                                :
                                <label htmlFor="t-professional">Sou um profissional</label>
                            }
                            {
                                formInputs.typeProfile === 'PROFILE'
                                ?
                                <label className='selected' htmlFor="t-profile">Sou um usuário</label>
                                :
                                <label htmlFor="t-profile">Sou um usuário</label>
                            }
                        </div>
                    </div>
                    <InputForm
                    inputType='text' 
                    name='name'  
                    placeholder='Nome completo:'  
                    value={formInputs.name} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />

                    <InputForm
                    inputType='text' 
                    name='username'  
                    placeholder='Usuário:'  
                    value={formInputs.username} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />   

                    <InputForm
                    inputType='email' 
                    name='email'  
                    placeholder='Email:'  
                    value={formInputs.email} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />    

                    <SelectForm
                    name='gender'  
                    placeholder='Selecione o seu gênero:'  
                    value={formInputs.gender} 
                    errors={errors} 
                    options={[
                        {value: 'MASCULINO', label: 'Masculino'},
                        {value: 'FEMININO', label: 'Feminino'},
                        {value: 'OUTROS', label: 'Outros'}
                    ]}
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />   

                    <DivInterestsForm
                    formRegister={formRegister}
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    errors={errors}
                    />   
                    
                </>
                :
                <>
                    <InputForm
                    inputType='text' 
                    name='phone'  
                    placeholder='Celular:'  
                    value={formInputs.phone} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />   

                    <p>Data de nascimento:</p>
                    <InputForm
                    inputType='date' 
                    name='date-birth'  
                    placeholder=''  
                    value={formInputs.dateBirth} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />   

                    <PasswordInputForm
                    inputType={!viewPassword ? 'password' : 'text'}
                    name='password1'  
                    placeholder='Senha:'  
                    value={formInputs.password1} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />   

                    <PasswordInputForm
                    inputType={!viewPassword ? 'password' : 'text'}
                    name='password2'  
                    placeholder='Repetir senha:'  
                    value={formInputs.password2} 
                    errors={errors} 
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                    />

                    <label className='inputs-extras'>
                        <input onChange={handleViewPassword} type="checkbox"/>
                        <p>
                            Mostrar senhas.
                        </p>
                    </label>
                    <span className='row'></span>
                    <label className='inputs-extras'>
                        <input name='termos' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormInputs({...formInputs, termos: e.target.checked})} 
                        type="checkbox" checked={formInputs.termos ? true : false}/>
                        <p>
                            Você concorda com os nossos termos?
                        </p>
                    </label>
                    <ErrorAuth errors={errors} type='termos'/>
                </>
            }
            <div id='botoes-form'>
                {etapasForm === 2
                && 
                <button className='button-voltar-etapa' onClick={handleBtnVoltar}>
                    Voltar
                </button>}
                <button type='submit' ref={buttonRegister}>
                    {etapasForm === 1 ? 'Próxima Etapa' : 'Criar Conta'}
                </button>
                <span ref={loader} className='loader'></span>
            </div>
            <ErrorAuth errors={errors} type='lenErrors'/>
            <ErrorAuth errors={errors} type="system"/>
            <Link href='/auth/login'>Tem uma conta? Faça login</Link>
        </form>
    )
}