'use client';

import { FaPencilAlt } from "react-icons/fa";
import '../styles/profissional.scss';
import { IMaskInput } from 'react-imask';
import DivInterestsAtualizarProfissional from './DivInterestsAtualizarProfissional';
import DivApproachesAtualizarProfissional from './DivApproachesAtualizarProfissional';
import DivSpecialtiesAtualizarProfissional from './DivSpecialtiesAtualizarProfissional';
import DivLanguagesAtualizarProfissional from './DivLanguagesAtualizarProfissional';
import React, { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import {FormAtualizarValues, BodyRequestAtualizarForm, ResponseAtualizarForm, ResponseGetUrlPhoto} from '../interfaces';
import {Errors} from '@auth/interfaces';
import getUrlPhoto from '@app/dashboard/profissional/functions/getUrlPhoto';
import postUpgradeProfessional from '@app/dashboard/profissional/functions/postUpgradeProfessional';
import ErrorAuth from '@auth/components/ErrorAuth'
import { ProfessionalInfo } from '../interfaces';
import extractProfessionalInterests from '@auth/register/functions/extractProfessionalInterests';
import extractProfessionalApproaches from '../functions/extractProfessionalApproaches';
import extractProfessionalSpecialties from '../functions/extractProfessionalSpecialties';
import extractProfessionalLanguages from '../functions/extractProfessionalLanguages';
import {interestsInterface} from '@auth/register/interfaces';
import {approachesInterface, specialtiesInterface, languagesInterface, optionsClientInterface} from '../interfaces';
import Message from '@app/components/Message';
import { MdError } from "react-icons/md";
import {MessageType} from '@app/interfaces';

export default function AlterProfessional(props: {professionalInfo: ProfessionalInfo}){
    const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>(props.professionalInfo);

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

    const buttonAtualizar = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    let [optionsClient, setOptionsClient] = useState<optionsClientInterface | null>(null);

    useEffect(() => {
        const resolveFetch = async () => {
            const interests: interestsInterface[] = await extractProfessionalInterests();
            const approaches: approachesInterface[] = await extractProfessionalApproaches();
            const specialties: specialtiesInterface[] = await extractProfessionalSpecialties();
            const languages: languagesInterface[] = await extractProfessionalLanguages();
            setOptionsClient({
                ...optionsClient, 
                interests: interests, 
                approaches: approaches, 
                specialties: specialties, 
                languages: languages
            });
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
        approaches: [],
        specialties: [],
        languages: [],
        gender: '',
        phone: '',
        file: null,
        password: '',
        password1: '',
        password2: '',
        typeProfile: 'PROFESSIONAL',
    });
    const [errors, setErrors] = useState<Errors[]>([]);

    const updateprofessionalInfo = () => {
        const extractPhoto = async () => {
            let data: ResponseGetUrlPhoto = await getUrlPhoto(professionalInfo.uuid);

            setProfessionalInfo({
                ...professionalInfo,
                name: formInputs.name,
                username: formInputs.username,
                linkPhoto: data?.urlPhoto ? data.urlPhoto : undefined,
                email: formInputs.email,
                interests: formInputs.interests ? formInputs.interests : [],
                approaches: formInputs.approaches ? formInputs.approaches : [],
                specialties: formInputs.specialties ? formInputs.specialties : [],
                languages: formInputs.languages ? formInputs.languages : [],
                gender: formInputs.gender,
                phone: formInputs.phone
            })
        }
        extractPhoto();
    }

    useEffect(() => {
        setFormInputs({...formInputs, 
            interests: professionalInfo.interests ? professionalInfo.interests : [],
            approaches: professionalInfo.approaches ? professionalInfo.approaches : [],
            specialties: professionalInfo.specialties ? professionalInfo.specialties : [],
            languages: professionalInfo.languages ? professionalInfo.languages : [],
            name: professionalInfo.name,
            username: professionalInfo.username,
            email: professionalInfo.email,
            gender: professionalInfo.gender,
            phone: professionalInfo.phone,
        });
    }, [professionalInfo]);

    const handleCancel = () => {
        setFormInputs({...formInputs, 
            interests: professionalInfo.interests ? professionalInfo.interests : [],
            approaches: professionalInfo.approaches ? professionalInfo.approaches : [],
            specialties: professionalInfo.specialties ? professionalInfo.specialties : [],
            languages: professionalInfo.languages ? professionalInfo.languages : [],
            name: professionalInfo.name,
            username: professionalInfo.username,
            email: professionalInfo.email,
            gender: professionalInfo.gender,
            phone: professionalInfo.phone,
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
            !formInputs.name || 
            !formInputs.username || 
            !formInputs.email || 
            !formInputs.gender || 
            formInputs.interests.length === 0 ||
            formInputs.approaches.length === 0 ||
            formInputs.specialties.length === 0 ||
            formInputs.languages.length === 0 ||
            !formInputs.phone ||
            !formInputs.file
        ){
            errors.push({type: 'system', description: 'Os campos obrigatórios não podem ficar vazios.'});
            lenErrors+=1;
        }

        if(formInputs && formInputs.username && formInputs.username.length < 5){
            errors.push({type: 'username', description: 'O nome do usuário deve ter no mínimo 5 caracteres.'});
            lenErrors+=1;
        }

        if(formInputs.interests?.length === 0){
            errors.push({type: 'interests', description: 'Você não pode deixar a lista de interesses vazia. Escolha no mínimo 1.'});
            lenErrors+=1;
        }

        if(formInputs.approaches?.length === 0){
            errors.push({type: 'approaches', description: 'Você não pode deixar a lista de abordagens vazia. Escolha no mínimo 1.'});
            lenErrors+=1;
        }

        if(formInputs.specialties?.length === 0){
            errors.push({type: 'specialties', description: 'Você não pode deixar a lista de especialidades vazia. Escolha no mínimo 1.'});
            lenErrors+=1;
        }

        if(formInputs.languages?.length === 0){
            errors.push({type: 'languages', description: 'Você não pode deixar a lista de idiomas vazia. Escolha no mínimo 1.'});
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
        if(!professionalInfo.linkPhoto && !formInputs.file){
            errors.push({type: 'file', description: 'Adicione uma foto de perfil.'});
            lenErrors+=1;
        }
        if(formInputs.file && formInputs.file.size / (1024 * 1024) >= 5){
            errors.push({type: 'file', description: 'O tamanho da foto precisa ser menor que 5MB.'});
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
                approaches: formInputs.approaches.map(approaches => approaches.value),
                specialties: formInputs.specialties.map(specialties => specialties.value),
                languages: formInputs.languages.map(interests => interests.value),
                gender: formInputs.gender,
                typeProfile: formInputs.typeProfile,
            }
            viewLoader();
            
            const data: ResponseAtualizarForm | undefined = await postUpgradeProfessional(body);

            if(data && data.status === 'ERROR' && data.type){
                disableLoader();
                errors.push({type: data.type, description: data.message});
                errors.push({type: 'lenErrors', description: '1'});
                setErrors(errors);
            }
            else if(data && data.status === 'SUCCESS'){
                disableLoader();
                updateprofessionalInfo();
                viewMessage('O seu perfil de profissional foi atualizado com sucesso', 'SUCCESS');
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
            <div className="profissional">
                <div className="profissional-cabecalho">
                    <h1>
                        Meu Perfil de Profissional
                    </h1>
                    {
                        optionsClient 
                        &&
                        <button onClick={() => setStateUpgrade(1)}>
                            <FaPencilAlt/>
                            Alterar Dados
                        </button>
                    }
                </div>
                {
                    !(professionalInfo.interests?.length !== 0) &&
                    !(professionalInfo.approaches?.length !== 0) &&
                    !(professionalInfo.specialties?.length !== 0) &&
                    !(professionalInfo.languages?.length !== 0) &&
                    !professionalInfo.linkPhoto &&
                    <span className="message error">
                        <MdError/> Para ter o seu perfil de profissional ativo, você deve completar o seu cadastro preenchendo todos os campos obrigatórios.
                    </span>
                }
                <div className="profissional-box">
                    <div className="profissional-foto">
                        {
                            professionalInfo.linkPhoto
                            ?
                            <img src={professionalInfo.linkPhoto} alt="" />
                            :
                            <img src="/user.png" alt="" />
                        }

                        {
                            !professionalInfo.linkPhoto &&
                            <p className="error">
                                <MdError/> Adicione uma foto.
                            </p>
                        }

                        <h2>
                            {professionalInfo.name?.split(' ')[0]}
                        </h2>
                    </div>
                    <div className="profissional-info">
                        <div>
                            <p>
                                Nome: 
                            </p>
                            <strong>
                                {professionalInfo.name}
                            </strong>
                        </div>
                        <div>
                            <p>
                                E-mail: 
                            </p>
                            <strong>
                                {professionalInfo.email}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Celular: 
                            </p>
                            <strong>
                                {professionalInfo.phone}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Abordagens: 
                            </p>
                            <div>
                                {
                                    professionalInfo.approaches?.length !== 0
                                    ?
                                    professionalInfo.approaches.map((approach) => {
                                        return <strong key={approach.value}>{approach.label}</strong>
                                    })
                                    :
                                    <p className="error">
                                        <MdError/> Adicione abordagens.
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="profissional-info">
                        <div>
                            <p>
                                Usuário: 
                            </p>
                            <strong>
                                {professionalInfo.username}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Aniversário: 
                            </p>
                            <strong>
                                {professionalInfo.dateBirth}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Confirmação de e-mail: 
                            </p>
                            <strong>
                                {
                                    professionalInfo.confirmacaoEmail
                                    ?
                                    <img src="/check.png" alt="" />
                                    :
                                    <img src="/block.png" alt="" />
                                }
                            </strong>
                        </div>
                        <div>
                            <p>
                                Especialidades: 
                            </p>
                            <div>
                                {
                                    professionalInfo.specialties?.length !== 0
                                    ?
                                    professionalInfo.specialties.map((specialtiy) => {
                                        return <strong key={specialtiy.value}>{specialtiy.label}</strong>
                                    })
                                    :
                                    <p className="error">
                                        <MdError/> Adicione especialidades.
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="profissional-info">
                        <div>
                            <p>
                                Sexo: 
                            </p>
                            <strong>
                                {`${professionalInfo.gender.charAt(0).toUpperCase()}${professionalInfo.gender.substring(1).toLocaleLowerCase()}`}
                            </strong>
                        </div>
                        <div>
                            <p>
                                Interesses: 
                            </p>
                            <div>
                                {
                                    professionalInfo.interests?.length !== 0
                                    ?
                                    professionalInfo.interests.map((interest) => {
                                        return <strong key={interest.value}>{interest.label}</strong>
                                    })
                                    :
                                    <p className="error">
                                        <MdError/> Adicione interesses.
                                    </p>
                                }
                            </div>
                        </div>
                        <div>
                            <p>
                                Idiomas: 
                            </p>
                            <div>
                                {
                                    professionalInfo.languages?.length !== 0
                                    ?
                                    professionalInfo.languages.map((language) => {
                                        return <strong key={language.value}>{language.label}</strong>
                                    })
                                    :
                                    <p className="error">
                                        <MdError/> Adicione idiomas.
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {stateUpgrade === 1 &&
            <form ref={formAtualizar} className="alterar-profissional" onSubmit={handleSubmit}>
                <h2>
                    Alterar Perfil do Profissional
                </h2>
                <div className="alterar-profissional-box">
                    <div>
                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="name" id="name" value={formInputs.name} className={formInputs.name ? '' : 'error'}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'name')} />
                            <ErrorAuth errors={errors} type='name'/>
                        </div>
                        <div>
                            <label htmlFor="username">Usuário:</label>
                            <input type="text" name="username" id="username" value={formInputs.username} className={formInputs.username ? '' : 'error'}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'username')} />
                            <ErrorAuth errors={errors} type='username'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" value={formInputs.email} className={formInputs.email ? '' : 'error'}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'email')}/>
                            <ErrorAuth errors={errors} type='email'/>
                        </div>
                        <div>
                            <label htmlFor="phone">Celular:</label>
                            <IMaskInput
                                id='phone'
                                name='phone'
                                mask="+55 (00) 00000-0000" value={formInputs.phone} className={formInputs.phone ? '' : 'error'}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'phone')}
                            />
                            <ErrorAuth errors={errors} type='phone'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender" value={formInputs.gender} className={formInputs.gender ? '' : 'error'}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeForm(e, 'gender')}>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMININO">Feminino</option>
                                <option value="OUTROS">Outros</option>
                            </select>
                            <ErrorAuth errors={errors} type='sexo'/>
                        </div>
                        {
                            optionsClient?.interests 
                            &&
                            <div>
                                <div>
                                    <p>Interesses:</p>
                                    <DivInterestsAtualizarProfissional
                                    formAtualizar={formAtualizar}
                                    formInputs={formInputs}
                                    setFormInputs={setFormInputs}
                                    options={optionsClient?.interests}
                                    valueInterests={formInputs.interests}
                                    errors={errors}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            optionsClient?.approaches 
                            &&
                            <div>
                                <div>
                                    <p>Abordagens:</p>
                                    <DivApproachesAtualizarProfissional
                                    formAtualizar={formAtualizar}
                                    formInputs={formInputs}
                                    setFormInputs={setFormInputs}
                                    options={optionsClient.approaches}
                                    valueApproaches={formInputs.approaches}
                                    errors={errors}/>
                                </div>
                            </div>
                        }
                        {
                            optionsClient?.specialties 
                            &&
                            <div>
                                <div>
                                    <p>Especialidades:</p>
                                    <DivSpecialtiesAtualizarProfissional
                                    formAtualizar={formAtualizar}
                                    formInputs={formInputs}
                                    setFormInputs={setFormInputs}
                                    options={optionsClient?.specialties}
                                    valueSpecialties={formInputs.specialties}
                                    errors={errors}/>
                                </div>
                            </div>
                        }
                        {
                            optionsClient?.languages 
                            &&
                            <div>
                                <div>
                                    <p>Idiomas:</p>
                                    <DivLanguagesAtualizarProfissional
                                    formAtualizar={formAtualizar}
                                    formInputs={formInputs}
                                    setFormInputs={setFormInputs}
                                    options={optionsClient?.languages}
                                    valueLanguages={formInputs.languages}
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
                            <input type='file' name="file" id="file" accept="image/*" className={professionalInfo.linkPhoto ? '' : 'error'}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e, 'file')}/>
                            <ErrorAuth errors={errors} type='file'/>
                        </div>
                    </div>
                    <h3>
                        Mudar a senha (opcional)
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