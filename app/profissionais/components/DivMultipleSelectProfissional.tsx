'use client';

import {DivMultipleSelectInterface, DivMultipleSelectPropsInterface, DivMultipleSelectLanguageInterface} from '../interfaces';
import {useState, useRef, useEffect} from 'react';

export default function DivApproachesAtualizarProfissional(props: DivMultipleSelectPropsInterface){
    const formAtualizar = props.formAtualizar;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const options = props.options;
    const formInputsName = props.formInputsName;
    const formOptions = props.formOptions;

    const [optionsSearch, setOptionsSearch] = useState('');
    const [optionsDropbox, setOptionsDropbox] = useState(0);
    const optionsDropboxRef = useRef(0);
    const handleOptionsDropbox = (count: number) => {
        optionsDropboxRef.current = count;
        setOptionsDropbox(count);
    }

    const inputOptionsSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const el = e.target as Element;
    
            const elOptionsBox = document.querySelector(`#options-${formInputsName}-box`);
            const elOptionsBoxInput = document.querySelector(`#options-${formInputsName}-box>input`);
            const elOptionsDropbox = document.querySelector(`#options-${formInputsName}-box > div`);
            const elOptionsDropboxLabels = document.querySelectorAll(`#options-${formInputsName}-box > div > label`);
            const elOptionsDropboxLabelsInputs = document.querySelectorAll(`#options-${formInputsName}-box > div > label > input`);
            const elOptionsDropboxLabelsP = document.querySelectorAll(`#options-${formInputsName}-box > div > label > p`);
            let validador = false;
            if(elOptionsDropboxLabels){
                for(let i = 0; i < elOptionsDropboxLabels.length; i++){
                    if(elOptionsDropboxLabels[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador && elOptionsDropboxLabelsInputs){
                for(let i = 0; i < elOptionsDropboxLabelsInputs.length; i++){
                    if(elOptionsDropboxLabelsInputs[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador && elOptionsDropboxLabelsP){
                for(let i = 0; i < elOptionsDropboxLabelsP.length; i++){
                    if(elOptionsDropboxLabelsP[i] === el){
                        validador = true;
                        break;
                    }
                }
            }
    
            if(!validador && (el === elOptionsBox || el === elOptionsBoxInput || el === elOptionsDropbox)){
                validador = true;
            }

            if(validador && optionsDropboxRef.current == 0){
                handleOptionsDropbox(1);
            } else if(!validador && optionsDropboxRef.current == 1){
                handleOptionsDropbox(0);
            }
        };

        document?.addEventListener('click', (handleClick));
    
        return () => {
            document?.removeEventListener('click', handleClick);
        };
    }, []); 

    const filterOptions = (values: string[]) => {
        const array: DivMultipleSelectInterface[] = [];
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

    const manipuleFormInputName = (optionsFormated: DivMultipleSelectInterface[]) => {
        if(formInputsName === 'abordagens'){
            setFormInputs({...formInputs, abordagens: optionsFormated});
        } else if(formInputsName === 'especialidades'){
            setFormInputs({...formInputs, especialidades: optionsFormated});
        } else if(formInputsName === 'interesses'){
            setFormInputs({...formInputs, interesses: optionsFormated});
        } else if(formInputsName === 'idiomas'){
            setFormInputs({...formInputs, idiomas: optionsFormated});
        }
    }

    const handleChangeInputsOptionsAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>(`#options-${formInputsName}-box  > div > label > input`);
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const optionsFormated = filterOptions(values);
                manipuleFormInputName(optionsFormated);
            }
        } else{
            manipuleFormInputName([]);
        }
    }

    const handleChangeInputsOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>(`#options-${formInputsName}-box  > div > label > input`);
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const optionsFormated = filterOptions(values);
            manipuleFormInputName(optionsFormated);
        }
    }

    const placeholder = 'Procure e selecione:';

    return (
        <>
            <div className='options-box' id={`options-${formInputsName}-box`}>
                <input type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setOptionsSearch(e.target.value);
                }}
                className={`${optionsDropbox === 1 ? 'make-borders-radius options-search' : 'options-search'}`}
                name="options-search" ref={inputOptionsSearch}
                placeholder={
                    formOptions && formOptions.length === 1
                    ? `1 selecionado` 
                    : `${formOptions.length === 0
                        ? placeholder
                        : `${formOptions.length} selecionados` 
                    }`
                }/>
                {optionsDropbox === 1 &&
                    <div className='options-dropbox'>
                        {
                            optionsSearch === ''
                            &&
                            <label>
                                <input type="checkbox" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeInputsOptionsAll(e);
                                }} checked={formOptions.length === options.length ? true : false}/>
                                <p>
                                Selecione todas as opções
                                </p>
                            </label>
                        }
                        {options.map((opcao: DivMultipleSelectInterface) => {
                            const value: string = opcao.value;
                            const label: string = opcao.label;
                            const labelFinal = label + ('level' in opcao ? ` - ${opcao.level}` : '')
                            if(value.toLowerCase().indexOf(optionsSearch.toLowerCase()) != -1){
                                return (
                                    <label key={value.toUpperCase()}>
                                        <input type="checkbox" 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChangeInputsOptions(e);
                                        }} 
                                        name={formInputsName} 
                                        checked={formOptions.map(option => option.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                        className='options-checkbox' value={value.toUpperCase()} />
                                        <p>
                                        {labelFinal}
                                        </p>
                                    </label>
                                )
                            } 
                        })}
                    </div>
                }
            </div>
        </>
    )
}