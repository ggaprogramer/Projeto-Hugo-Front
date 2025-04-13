'use client';

import {DivLanguagesAtualizarFormInterface} from '../interfaces';
import {OptionType, Errors} from '@auth/interfaces';
import {useMemo, useState, useRef, useEffect} from 'react';
import ErrorAuth from '@auth/components/ErrorAuth';
import {languagesInterface} from '../interfaces';

export default function DivLanguagesAtualizarProfissional(props: DivLanguagesAtualizarFormInterface){
    const formAtualizar = props.formAtualizar;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const errors: Errors[] = props.errors;
    const options = props.options;

    const [languagesSearch, setLanguagesSearch] = useState('');
    const [languagesDropbox, setLanguagesDropbox] = useState(0);
    const inputLanguagesSearch = useRef<HTMLInputElement>(null);

    const handleInputLanguagesEnter = () => {
        if(languagesDropbox === 0){
            setLanguagesDropbox(1);
        }
    }

    const handleInputLanguagesLeave = () => {
        if(languagesDropbox === 1){
            setLanguagesDropbox(0);
            inputLanguagesSearch.current?.blur();
        }
    }

    const filterLanguages = (values: string[]) => {
        const array: languagesInterface[] = [];
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

    const handleChangeInputsLanguagesAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.languages-checkbox');
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const languagesFormated = filterLanguages(values);
                setFormInputs({...formInputs, languages: languagesFormated});
            }
        } else{
            setFormInputs({...formInputs, languages: []});
        }
    }

    const handleChangeInputsLanguages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.languages-checkbox');
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const languagesFormated = filterLanguages(values);
            setFormInputs({...formInputs, languages: languagesFormated});
        }
    }

    const placeholder = 'Selecione os idiomas e o nível de conhecimento delas:';

    return (
        <>
            <div id='languages-box' onMouseLeave={handleInputLanguagesLeave}>
                <input type="text"
                className={formInputs.languages.length !== 0 ? '' : 'error'}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLanguagesSearch(e.target.value);
                }}
                onFocus={handleInputLanguagesEnter}
                name="languages-search" ref={inputLanguagesSearch} id="languages-search" 
                placeholder={
                    formInputs.languages && formInputs.languages.length === 1
                    ? `1 idioma selecionado` 
                    : `${formInputs.languages.length === 0
                        ? placeholder
                        : `${formInputs.languages.length} idiomas selecionados` 
                    }`
                }/>
                {languagesDropbox === 1 &&
                    <div id='languages-dropbox'>
                    {
                        languagesSearch === ''
                        &&
                        <label>
                            <input type="checkbox" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeInputsLanguagesAll(e);
                            }} checked={formInputs.languages.length === options.length ? true : false}/>
                            <p>
                            Selecione todas as opções
                            </p>
                        </label>
                    }
                    {options.map((opcao: languagesInterface) => {
                        const value: string = opcao.value;
                        const label: string = opcao.label;
                        const level: string = opcao.level;
                        if(value.toLowerCase().indexOf(languagesSearch.toLowerCase()) != -1){
                            return (
                                <label key={value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsLanguages(e);
                                    }} 
                                    name='languages' 
                                    checked={formInputs.languages.map(languages => languages.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                    className='languages-checkbox' value={value.toUpperCase()} />
                                    <p>
                                    {label} - {level}
                                    </p>
                                </label>
                            )
                        } 
                    })}
                </div>
                }
            </div>
            <ErrorAuth errors={errors} type='languages'/>
        </>
    )
}