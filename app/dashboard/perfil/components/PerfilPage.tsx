'use client';

import { FaPencilAlt } from "react-icons/fa";
import '../styles/perfil.scss';
import { IMaskInput } from 'react-imask';
import DivInterestsAtualizarPerfil from './DivInterestsAtualizarPerfil';
import Link from 'next/link';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FormAtualizarValues, BodyRequestAtualizarForm, ResponseAtualizarForm} from '../interfaces';
import {Errors} from '@auth/interfaces';
import { useRouter } from 'next/navigation';
import ErrorAuth from '@auth/components/ErrorAuth'
import { ProfileInfo } from '../interfaces';
import extractProfileInterests from '@auth/register/functions/extractProfileInterests';
import extractProfessionalInterests from '@auth/register/functions/extractProfessionalInterests';
import {interestsInterface} from '@auth/register/interfaces';

export default function PerfilPage(props: {profileInfo: ProfileInfo}){
    const profileInfo: ProfileInfo = props.profileInfo;

    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;

    const buttonAtualizar = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    let [interestsResponse, setInterestsResponse] = useState<interestsInterface[][] | null>(null);
    let [interests, setInterests] = useState<interestsInterface[] | null>(null);

    useEffect(() => {
        const resolveFetch = async () => {
            const profileInterests: interestsInterface[] = await extractProfileInterests();
            const professionalInterests: interestsInterface[] = await extractProfessionalInterests();
            setInterestsResponse([profileInterests, professionalInterests]);
        }
        resolveFetch();
    }, []);
    
    const viewLoader = () => {
        buttonAtualizar?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }
    const disableLoader = () => {
        buttonAtualizar?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }

    const formAtualizar = useRef<HTMLFormElement>(null);
    const [formInputs, setFormInputs] = useState<FormAtualizarValues>({
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

    useEffect(() => {
        setFormInputs({...formInputs, interests: profileInfo.interests});
    }, [profileInfo]);

    useEffect(() => {
        if(interestsResponse && formInputs.typeProfile === 'PROFESSIONAL'){
            setInterests(interestsResponse[1]);
        } else if(interestsResponse) {
            setInterests(interestsResponse[0]);
        }
    }, [formInputs, interestsResponse]);

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

    function transformarData(data: string) {
        const partes = data.split('/');
        
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    const handleViewPassword = () => {
        setViewPassword((viewPassword) => viewPassword ? false : true);
    }

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
        if(name == 'name'){
            setFormInputs({...formInputs, name: e.target.value});
        }
        else if(name == 'username'){
            setFormInputs({...formInputs, username: e.target.value});
        }
        else if(name == 'email'){
            setFormInputs({...formInputs, email: e.target.value});
        }
        else if(name == 'interests'){
            setFormInputs({...formInputs, email: e.target.value});
        }
        else if(name == 'gender'){
            setFormInputs({...formInputs, gender: e.target.value});
        }
        else if(name == 'phone'){
            setFormInputs({...formInputs, phone: e.target.value});
        }
        else if(name == 'date-birth'){
            setFormInputs({...formInputs, dateBirth: e.target.value});
        }
        else if(name == 'password'){
            setFormInputs({...formInputs, password: e.target.value});
        }
        else if(name == 'password1'){
            setFormInputs({...formInputs, password1: e.target.value});
        }
        else if(name == 'password2'){
            setFormInputs({...formInputs, password2: e.target.value});
        }
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
            formInputs.interests.length === 0 &&
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

    const makeUpgrade = async () => {
        try{
            const body: BodyRequestAtualizarForm = {
                name: formInputs.name,
                username: formInputs.username,
                password1: formInputs.password1,
                password2: formInputs.password2,
                email: formInputs.email,
                phone: formInputs.phone,
                dateBirth: formInputs.dateBirth,
                interests: formInputs.interests,
                gender: formInputs.gender,
                typeProfile: formInputs.typeProfile,
            }
            viewLoader();
            const response = await fetch(`${urlBack}/profile/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data: ResponseAtualizarForm = await response.json();
            if(data.status === 'ERROR' && data.type){
                errors.push({type: data.type, description: data.message});
                errors.push({type: 'lenErrors', description: '1'});
                disableLoader();
            }
            else if(data.status === 'SUCCESS'){
                // TODO enviar uma mensagem de sucesso
                

            } else{
                disableLoader();
            }
        } catch{
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
        }
    }

    return (
        <>
            <div className="perfil">
                <div className="perfil-cabecalho">
                    <h1>
                        Meu Perfil
                    </h1>
                    {
                        interests 
                        &&
                        <button onClick={() => setStateUpgrade(1)}>
                            <FaPencilAlt/>
                            Alterar Dados
                        </button>
                    }
                </div>
                <div className="perfil-box">
                    <div className="perfil-foto">
                        <img src="/user.png" alt="" />
                        <h2>
                            {profileInfo.name?.split(' ')[0]}
                        </h2>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Nome: 
                            </p>
                            <strong>
                                {profileInfo.name}
                            </strong>
                        </div>
                        <div>
                            <p>
                                E-mail: 
                            </p>
                            <strong>
                                {profileInfo.email}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Celular: 
                            </p>
                            <strong>
                                {profileInfo.phone}
                            </strong>
                        </div>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Usuário: 
                            </p>
                            <strong>
                                {profileInfo.username}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Aniversário: 
                            </p>
                            <strong>
                                {profileInfo.dateBirth}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Confirmação de e-mail: 
                            </p>
                            <strong>
                                {
                                    profileInfo.confirmacaoEmail
                                    ?
                                    <img src="/check.png" alt="" />
                                    :
                                    <img src="/block.png" alt="" />
                                }
                            </strong>
                        </div>
                    </div>
                    <div className="perfil-info">
                        <div>
                            <p>
                                Sexo: 
                            </p>
                            <strong>
                                {profileInfo.gender}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Interesses: 
                            </p>
                            <strong>
                                {profileInfo.interests.map((interest) => {
                                    return <p key={interest.value}>{interest.label}</p>
                                })}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            {stateUpgrade === 1 &&
            <form ref={formAtualizar} className="alterar-perfil" onSubmit={handleSubmit}>
                <h2>
                    Alterar Perfil
                </h2>
                <div className="alterar-perfil-box">
                    <div>
                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="name" id="name" value={profileInfo.name}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'name')} />
                            <ErrorAuth errors={errors} type='name'/>
                        </div>
                        <div>
                            <label htmlFor="username">Usuário:</label>
                            <input type="text" name="username" id="username" value={profileInfo.username}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'username')} />
                            <ErrorAuth errors={errors} type='username'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" value={profileInfo.email}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'email')}/>
                            <ErrorAuth errors={errors} type='email'/>
                        </div>
                        <div>
                            <label htmlFor="phone">Celular:</label>
                            <IMaskInput
                                id='phone'
                                name='phone'
                                mask="+55 (00) 00000-0000" value={profileInfo.phone}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'phone')}
                            />
                            <ErrorAuth errors={errors} type='phone'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender" value={profileInfo.gender}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeForm(e, 'gender')}>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMININO">Feminino</option>
                                <option value="OUTROS">Outros</option>
                            </select>
                            <ErrorAuth errors={errors} type='sexo'/>
                        </div>
                        <div>
                            <label htmlFor="date-birth">Aniversário:</label>
                            <input type="date" name="date-birth" id="date-birth" value={transformarData(profileInfo.dateBirth)}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'date-birth')} />
                            <ErrorAuth errors={errors} type='dateBirth'/>
                        </div>
                    </div>
                    {
                        interests 
                        &&
                        <div>
                            <div>
                                <p>Interesses:</p>
                                <DivInterestsAtualizarPerfil
                                formAtualizar={formAtualizar}
                                formInputs={formInputs}
                                setFormInputs={setFormInputs}
                                options={interests}
                                valueInterests={profileInfo.interests}
                                errors={errors}/>
                                <ErrorAuth errors={errors} type='interests'/>
                            </div>
                        </div>
                    }
                    <h3>
                        Mudar a senha
                    </h3>
                    <div>
                        <div>
                            <label htmlFor="password">Senha antiga:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password" id="password" 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password')}/>
                        </div>
                        <ErrorAuth errors={errors} type='password'/>
                        <div>
                            <label htmlFor="password1">Nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password1" id="password1" 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password1')}/>
                        </div>
                        <ErrorAuth errors={errors} type='password1'/>
                        <div>
                            <label htmlFor="password2">Repetir nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password2" id="password2"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password2')}/>
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
                        <button ref={buttonAtualizar} type="submit">Salvar alterações</button>
                    </div>
                </div>
            </form>
            }
        </>
    )
}