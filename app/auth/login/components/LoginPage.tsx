"use client";

import '../style.scss';
import '@auth/styles/style.scss';
import '@auth/styles/input.scss';
import Link from 'next/link';
import InputLogin from './InputLogin';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth';
import {LoginFormValues} from '../interfaces';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import { useRouter, useSearchParams } from "next/navigation";
import {responseFormLogin, bodyRequestFormLogin} from '@auth/login/interfaces';
import {TypeProfile} from '@auth/register/interfaces';

export default function LoginPage() {
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const urlFront = process.env.NEXT_PUBLIC_FRONT_URL;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [errors, setErrors] = useState<Errors[]>([]);
    const [formInputs, setFormInputs] = useState<LoginFormValues>({
        email: '',
        password: '',
        rememberPassword: false
    });
    const formLogin = useRef<HTMLFormElement>(null);

    const buttonLogin = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);
    
    const viewLoader = () => {
        buttonLogin?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }

    const disableLoader = () => {
        buttonLogin?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }

    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const handleViewPassowrd = () => {
        setViewPassword((viewPassword) => viewPassword ? false : true);
    }

    const loginSuccess = async (redirect: string | null, token: string | null, lembrarSenha: boolean, typeProfile: TypeProfile | null) => {
        
        if(token){
            const response = await fetch(`${urlFront}/auth/login/api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: token, lembrarSenha: lembrarSenha}),
            });
    
            if(response.ok){
                if(redirect) {
                    router.push(redirect);
                } else if(typeProfile === 'PROFILE'){
                    router.push('/dashboard/perfil');
                } else {
                    router.push('/dashboard/profissional');
                }
            } else{
                disableLoader();
                setErrors([{type: 'system', description: 'Houve um erro na comunicação com o servidor.'}]);
            }
        } else{
            disableLoader();
            setErrors([{type: 'system', description: 'O token de autenticação não pode ser vazio.'}]);
        }

    }

    const makeLogin = async () => {
        try{
            const body: bodyRequestFormLogin = {
                email: formInputs.email,
                password: formInputs.password,
                lembrarSenha: formInputs.rememberPassword,
            }
            viewLoader();
            const response = await fetch(`${urlBack}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            const data: responseFormLogin = await response.json();
            if(data.status === 'ERROR' && data.type){
                setErrors([{type: data.type, description: data.message}]);
                disableLoader();
            } else if(data.status === 'SUCCESS' && data.token){
                const redirect: string | null = searchParams.get("redirect");
                loginSuccess(redirect, data.token, body.lembrarSenha, data.typeProfile);
            } else{
                disableLoader();
            }
        } catch(e){
            disableLoader();
            setErrors([{type: 'system', description: 'Houve um erro na comunicação com o servidor.'}]);
        }
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors: Errors[] = [];
        let lenErrors: number = 0;
        if(formInputs && !formInputs.email){
            errors.push({type: 'email', description: 'Nenhum e-mail foi enviado.'});
            lenErrors+=1;
        }
        if(formInputs && !formInputs.password){
            errors.push({type: 'password', description: 'Nenhuma senha foi enviada.'});
            lenErrors+=1;
        }

        if(lenErrors > 0){
            errors.push({type: 'lenErrors', description: lenErrors + ''});
        } 
        setErrors(errors);
        if(errors.length === 0) makeLogin();
    };

    return (
        <form onSubmit={handleSubmit} ref={formLogin} className='login-page-box login-page-form auth-form'>
            <h2 className='title-secoundary title-auth'>
                <img src="/logo.png" 
                alt="Login - Terapia" />
                Login
            </h2>
            <InputLogin 
            inputType="email" 
            name='email' 
            placeholder='Email:'
            value={formInputs.email}
            errors={errors}
            formInputs={formInputs}
            setFormInputs={setFormInputs}
            />
            <InputLogin 
            inputType={!viewPassword ? "password" : "text"}
            name='password' 
            placeholder='Senha:' 
            value={formInputs.password}
            errors={errors}
            formInputs={formInputs}
            setFormInputs={setFormInputs}
            />
            <label className='inputs-extras'>
                <input onChange={handleViewPassowrd} type="checkbox"/>
                <p>
                    Mostrar senha
                </p>
            </label>
            <span className='row'></span>
            <InputLogin 
            inputType="checkbox" 
            name='remember-password' 
            placeholder='' 
            value={formInputs.rememberPassword}
            errors={errors}
            formInputs={formInputs}
            setFormInputs={setFormInputs}
            />
            <ErrorAuth errors={errors} type="system"/>
            <button ref={buttonLogin} type='submit'>Entrar</button>
            <span ref={loader} className='loader'></span>
            <Link href='/forgot-password'>Esqueceu a senha?</Link>
            <Link href='/auth/register'>Não tem uma conta? Registre-se</Link>
        </form>
    )
}
