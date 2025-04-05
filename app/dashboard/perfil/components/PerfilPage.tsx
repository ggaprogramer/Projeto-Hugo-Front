'use client';

import { FaPencilAlt } from "react-icons/fa";
import '../styles/perfil.scss';
import { IMaskInput } from 'react-imask';
import DivInterestsAtualizarPerfil from './DivInterestsAtualizarPerfil';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FormAtualizarValues, BodyRequestAtualizarForm, ResponseAtualizarForm, ResponseGetUrlPhoto} from '../interfaces';
import {Errors} from '@auth/interfaces';
import getUrlPhoto from '@app/dashboard/functions/getUrlPhoto';
import ErrorAuth from '@auth/components/ErrorAuth'
import { ProfileInfo } from '../interfaces';
import extractProfileInterests from '@auth/register/functions/extractProfileInterests';
import extractProfessionalInterests from '@auth/register/functions/extractProfessionalInterests';
import {interestsInterface} from '@auth/register/interfaces';
import Message from '@app/components/Message';
import {MessageType} from '@app/interfaces';

export default function PerfilPage(props: {profileInfo: ProfileInfo, authToken: string | undefined}){
    const extractProfileInfo: ProfileInfo = props.profileInfo;
    const [profileInfo, setProfileInfo] = useState(extractProfileInfo);

    // Mensagem - Início
    const [viewMessageConfig, setViewMessageConfig] = useState<{
        status: boolean
        message: string,
        type: MessageType
    }>({
        status: false,
        message: '',
        type: 'INFO'
    });
    const viewMessage = (message: string, type: MessageType) => {
        setViewMessageConfig({message: message, type: type, status: true });
    }

    useEffect(() => {
        let id: NodeJS.Timeout;
    
        if (viewMessageConfig.status) {
            id = setTimeout(() => {
                setViewMessageConfig(prev => ({ ...prev, status: false }));
            }, 5000);
        }
    
        return () => {
            if (id) clearTimeout(id);
        };
    }, [viewMessageConfig]);
    // Mensagem - Fim

    const authToken = props.authToken ? props.authToken : '';

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
        file: null,
        password: '',
        password1: '',
        password2: '',
        typeProfile: 'PROFILE',
    });
    const [errors, setErrors] = useState<Errors[]>([]);

    const updateProfileInfo = () => {
        const extractPhoto = async () => {
            const data: ResponseGetUrlPhoto = await getUrlPhoto(authToken, profileInfo.uuid);

            setProfileInfo({
                ...profileInfo,
                name: formInputs.name,
                username: formInputs.username,
                linkPhoto: data?.urlPhoto ? data.urlPhoto : undefined,
                email: formInputs.email,
                interests: formInputs.interests,
                gender: formInputs.gender,
                phone: formInputs.phone
            })
        }
        extractPhoto();
    }

    useEffect(() => {
        setFormInputs({...formInputs, 
            interests: profileInfo.interests,
            name: profileInfo.name,
            username: profileInfo.username,
            email: profileInfo.email,
            gender: profileInfo.gender,
            phone: profileInfo.phone,
        });
    }, [profileInfo]);

    useEffect(() => {
        if(interestsResponse && formInputs.typeProfile === 'PROFESSIONAL'){
            setInterests(interestsResponse[1]);
        } else if(interestsResponse) {
            setInterests(interestsResponse[0]);
        }
    }, [formInputs, interestsResponse]);

    const handleCancel = () => {
        setFormInputs({...formInputs, 
            interests: profileInfo.interests,
            name: profileInfo.name,
            username: profileInfo.username,
            email: profileInfo.email,
            gender: profileInfo.gender,
            phone: profileInfo.phone,
            password: '',
            password1: '',
            password2: '',
        });
        setStateUpgrade(0);
        setErrors([]);
    }

    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const [stateUpgrade, setStateUpgrade] = useState<Number>(0);

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
        else if(name == 'file'){
            const input = e.target as HTMLInputElement;
            const file = input?.files ? input?.files[0] : null;
            if(file){
                setFormInputs({...formInputs, file: file});
            }
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
            !formInputs.file &&
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

        if(formInputs.interests.length === 0){
            errors.push({type: 'interests', description: 'Você não pode deixar a lista de interesses vazia. Escolha no mínimo 1.'});
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
        if(lenErrors > 0){
            errors.push({type: 'lenErrors', description: lenErrors + ''});
        } 
        setErrors(errors);
        if(errors.length === 0) makeUpgrade();
    }

    function fileToBase64(file: File): Promise<{ base64: string, mimeType: string }> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              const base64String = reader.result.split(',')[1]; // Extrai a parte base64
              const mimeType = reader.result.split(';')[0].split(':')[1]; // Extrai o tipo MIME (image/jpeg, image/png, etc.)
              resolve({ base64: base64String, mimeType });
            } else {
              reject('Erro ao ler o arquivo');
            }
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          reader.readAsDataURL(file); // Lê o arquivo como DataURL
        });
    }
      
      

    const makeUpgrade = async () => {
        let errors: Errors[] = [];
        
        let base64File = null;
        let mimeType = null
        if(formInputs.file) {
            const fileResponse = await fileToBase64(formInputs.file);
            base64File = fileResponse.base64;
            mimeType = fileResponse.mimeType;
        }

        try{
            const body: BodyRequestAtualizarForm = {
                name: formInputs.name,
                username: formInputs.username,
                password: formInputs.password,
                password1: formInputs.password1,
                password2: formInputs.password2,
                email: formInputs.email,
                base64File: base64File,
                mimeType: mimeType,
                phone: formInputs.phone,
                interests: formInputs.interests.map(interests => interests.value),
                gender: formInputs.gender,
                typeProfile: formInputs.typeProfile,
            }
            viewLoader();
            const response = await fetch(`${urlBack}/profile/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data: ResponseAtualizarForm = await response.json();
            if(data.status === 'ERROR' && data.type){
                disableLoader();
                errors.push({type: data.type, description: data.message});
                errors.push({type: 'lenErrors', description: '1'});
                setErrors(errors);
            }
            else if(data.status === 'SUCCESS'){
                disableLoader();
                updateProfileInfo();
                viewMessage('O seu perfil foi atualizado com sucesso', 'SUCCESS');
            } else{
                disableLoader();
            }
        } catch{
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
            setErrors(errors);
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
                        {
                            profileInfo.linkPhoto
                            ?
                            <img src={profileInfo.linkPhoto} alt="" />
                            :
                            <img src="/user.png" alt="" />
                        }

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
                                {`${profileInfo.gender.charAt(0).toUpperCase()}${profileInfo.gender.substring(1).toLocaleLowerCase()}`}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Interesses: 
                            </p>
                            <div>
                                {profileInfo.interests.map((interest) => {
                                    return <strong key={interest.value}>{interest.label}</strong>
                                })}
                            </div>
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
                            <input type="text" name="name" id="name" value={formInputs.name}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'name')} />
                            <ErrorAuth errors={errors} type='name'/>
                        </div>
                        <div>
                            <label htmlFor="username">Usuário:</label>
                            <input type="text" name="username" id="username" value={formInputs.username}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'username')} />
                            <ErrorAuth errors={errors} type='username'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" value={formInputs.email}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'email')}/>
                            <ErrorAuth errors={errors} type='email'/>
                        </div>
                        <div>
                            <label htmlFor="phone">Celular:</label>
                            <IMaskInput
                                id='phone'
                                name='phone'
                                mask="+55 (00) 00000-0000" value={formInputs.phone}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'phone')}
                            />
                            <ErrorAuth errors={errors} type='phone'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender" value={formInputs.gender}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeForm(e, 'gender')}>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMININO">Feminino</option>
                                <option value="OUTROS">Outros</option>
                            </select>
                            <ErrorAuth errors={errors} type='sexo'/>
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
                                    valueInterests={formInputs.interests}
                                    errors={errors}/>
                                </div>
                            </div>
                        }
                    </div>
                    <h3>
                        Adicionar nova foto
                    </h3>
                    <div>
                        <div>
                            <input type='file' name="file" id="file" accept="image/*"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'file')}/>
                            <ErrorAuth errors={errors} type='file'/>
                        </div>
                    </div>
                    <h3>
                        Mudar a senha
                    </h3>
                    <div>
                        <div>
                            <label htmlFor="password">Senha antiga:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password" id="password" 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password')}/>
                            <ErrorAuth errors={errors} type='password'/>
                        </div>
                        <div>
                            <label htmlFor="password1">Nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password1" id="password1" 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password1')}/>
                            <ErrorAuth errors={errors} type='password1'/>
                        </div>
                        <div>
                            <label htmlFor="password2">Repetir nova senha:</label>
                            <input type={viewPassword ? 'text' : 'password'} name="password2" id="password2"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'password2')}/>
                            <ErrorAuth errors={errors} type='password2'/>
                        </div>
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
                        <button onClick={handleCancel}>Cancelar</button>
                        <button ref={buttonAtualizar} type="submit">Salvar alterações</button>
                        <span ref={loader} className="loader"></span>
                    </div>
                </div>
            </form>
            }
            {viewMessageConfig.status && <Message message={viewMessageConfig.message} type={viewMessageConfig.type}/>}
        </>
    )
}