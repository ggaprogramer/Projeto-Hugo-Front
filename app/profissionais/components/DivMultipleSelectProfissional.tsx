'use client';

import {DivMultipleSelectInterface, DivMultipleSelectPropsInterface} from '../interfaces';
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
    const inputOptionsSearch = useRef<HTMLInputElement>(null);

    const handleInputOptionsEnter = () => {
        if(optionsDropbox === 0){
            setOptionsDropbox(1);
        }
    }

    const handleInputOptionsLeave = () => {
        if(optionsDropbox === 1){
            setOptionsDropbox(0);
            inputOptionsSearch.current?.blur();
        }
    }

    console.log(optionsDropbox);

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

    const handleChangeInputsOptionsAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>(`#options-${formInputsName}-checkbox`);
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const optionsFormated = filterOptions(values);
                setFormInputs({...formInputs, formInputsName: optionsFormated});
            }
        } else{
            setFormInputs({...formInputs, formInputsName: []});
        }
    }

    const handleChangeInputsOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>(`#options-${formInputsName}-checkbox`);
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const optionsFormated = filterOptions(values);
            setFormInputs({...formInputs, formInputsName: optionsFormated});
        }
    }

    const placeholder = 'Selecione:';

    return (
        <>
            <div className='options-box' onMouseLeave={handleInputOptionsLeave}>
                <input type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setOptionsSearch(e.target.value);
                }}
                onFocus={handleInputOptionsEnter}
                name="options-search" ref={inputOptionsSearch} className="options-search" 
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
                        if(value.toLowerCase().indexOf(optionsSearch.toLowerCase()) != -1){
                            return (
                                <label key={value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsOptions(e);
                                    }} 
                                    name={formInputsName} 
                                    checked={formOptions.map(option => option.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                    className='options-checkbox' id={`options-${formInputsName}-checkbox`} value={value.toUpperCase()} />
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
        </>
    )
}