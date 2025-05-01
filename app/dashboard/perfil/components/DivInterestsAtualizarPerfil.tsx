'use client';

import {DivInterestsAtualizarFormInterface} from '../interfaces';
import {OptionType, Errors} from '@auth/interfaces';
import {useMemo, useState, useRef, useEffect} from 'react';
import ErrorAuth from '@auth/components/ErrorAuth';
import {interestsInterface} from '@auth/register/interfaces';

export default function DivInterestsAtualizarPerfil(props: DivInterestsAtualizarFormInterface){
    const formAtualizar = props.formAtualizar;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const errors: Errors[] = props.errors;
    const options = props.options;

    const [interestsSearch, setInterestsSearch] = useState('');
    const [interestsDropbox, setInterestsDropbox] = useState(0);
    const interestsDropboxRef = useRef(0);
    const handleInterestsDropbox = (count: number) => {
        interestsDropboxRef.current = count;
        setInterestsDropbox(count);
    }

    const inputInterestsSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const elInterestsBox = document.querySelector(`#interests-box`);
            const elInterestsBoxInput = document.querySelector(`#interests-box>input`);
            const elInterestsDropbox = document.querySelector(`#interests-box  > div`);
            const elInterestsDropboxLabels = document.querySelectorAll(`#interests-box > div > label`);
            const elInterestsDropboxLabelsInputs = document.querySelectorAll(`#interests-box > div > label > input`);
            const elInterestsDropboxLabelsP = document.querySelectorAll(`#interests-box > div > label > p`);
            
            const el = e.target;

            let validador = false;
            for(let i = 0; i < elInterestsDropboxLabels.length; i++){
                if(elInterestsDropboxLabels[i] === el){
                    validador = true;
                    break;
                }
            }

            if(!validador){
                for(let i = 0; i < elInterestsDropboxLabelsInputs.length; i++){
                    if(elInterestsDropboxLabelsInputs[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador){
                for(let i = 0; i < elInterestsDropboxLabelsP.length; i++){
                    if(elInterestsDropboxLabelsP[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador && (el === elInterestsBox || el === elInterestsBoxInput || el === elInterestsDropbox)){
                validador = true;
            }

            if(validador && interestsDropboxRef.current == 0){
                handleInterestsDropbox(1);
            } else if(!validador && interestsDropboxRef.current == 1){
                handleInterestsDropbox(0);
            }
        };
    
        window?.addEventListener('click', handleClick);
    
        return () => {
            window?.removeEventListener('click', handleClick);
        };
    }, []); 

    const filterInterests = (values: string[]) => {
        const array: interestsInterface[] = [];
        for(let value of values){
            for(let option of options){
                if(option.value === value){
                    array.push(option);
                    break;
                }
            }
        }
        return array;
    }

    const handleChangeInputsInterestsAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.interests-checkbox');
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const interestsFormated = filterInterests(values);
                setFormInputs({...formInputs, interests: interestsFormated});
            }
        } else{
            setFormInputs({...formInputs, interests: []});
        }
    }

    const handleChangeInputsInterests = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.interests-checkbox');
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const interestsFormated = filterInterests(values);
            setFormInputs({...formInputs, interests: interestsFormated});
        }
    }

    const placeholder = formInputs.typeProfile === 'PROFILE' ? 'Selecione seus interesses:' : 'Selecione seus interesses de atuação:';

    return (
        <>
            <div id='interests-box'>
                <input type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInterestsSearch(e.target.value);
                }}
                name="interests-search" ref={inputInterestsSearch} id="interests-search" 
                placeholder={
                    formInputs.interests && formInputs.interests.length === 1
                    ? `1 interesse selecionado` 
                    : `${formInputs.interests.length === 0
                        ? placeholder
                        : `${formInputs.interests.length} interesses selecionados` 
                    }`
                }/>
                {interestsDropbox === 1 &&
                    <div id='interests-dropbox'>
                    {
                        interestsSearch === ''
                        &&
                        <label>
                            <input type="checkbox" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeInputsInterestsAll(e);
                            }} checked={formInputs.interests.length === options.length ? true : false}/>
                            <p>
                            Selecione todas as opções
                            </p>
                        </label>
                    }
                    {options.map((opcao: interestsInterface) => {
                        const value: string = opcao.value;
                        const label: string = opcao.label;
                        if(value.toLowerCase().indexOf(interestsSearch.toLowerCase()) != -1){
                            return (
                                <label key={value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsInterests(e);
                                    }} 
                                    name='interests' 
                                    checked={formInputs.interests.map(interests => interests.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                    className='interests-checkbox' value={value.toUpperCase()} />
                                    <p>
                                    {label}
                                    </p>
                                </label>
                            )
                        } 
                    })}
                </div>
                }
            </div>
            <ErrorAuth errors={errors} type='interests'/>
        </>
    )
}