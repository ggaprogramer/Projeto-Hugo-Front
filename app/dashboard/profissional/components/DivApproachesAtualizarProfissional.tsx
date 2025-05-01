'use client';

import {DivApproachesAtualizarFormInterface} from '../interfaces';
import {OptionType, Errors} from '@auth/interfaces';
import {useMemo, useState, useRef, useEffect} from 'react';
import ErrorAuth from '@auth/components/ErrorAuth';
import {approachesInterface} from '../interfaces';

export default function DivApproachesAtualizarProfissional(props: DivApproachesAtualizarFormInterface){
    const formAtualizar = props.formAtualizar;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const errors: Errors[] = props.errors;
    const options = props.options;


    const [approachesSearch, setApproachesSearch] = useState('');
    const [approachesDropbox, setApproachesDropbox] = useState(0);
    const approachesDropboxRef = useRef(0);
    const handleApproachesDropbox = (count: number) => {
        approachesDropboxRef.current = count;
        setApproachesDropbox(count);
    }

    const inputApproachesSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const elApproachesBox = document.querySelector(`#approaches-box`);
            const elApproachesBoxInput = document.querySelector(`#approaches-box>input`);
            const elApproachesDropbox = document.querySelector(`#approaches-box  > div`);
            const elApproachesDropboxLabels = document.querySelectorAll(`#approaches-box > div > label`);
            const elApproachesDropboxLabelsInputs = document.querySelectorAll(`#approaches-box > div > label > input`);
            const elApproachesDropboxLabelsP = document.querySelectorAll(`#approaches-box > div > label > p`);
            
            const el = e.target;

            let validador = false;
            for(let i = 0; i < elApproachesDropboxLabels.length; i++){
                if(elApproachesDropboxLabels[i] === el){
                    validador = true;
                    break;
                }
            }

            if(!validador){
                for(let i = 0; i < elApproachesDropboxLabelsInputs.length; i++){
                    if(elApproachesDropboxLabelsInputs[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador){
                for(let i = 0; i < elApproachesDropboxLabelsP.length; i++){
                    if(elApproachesDropboxLabelsP[i] === el){
                        validador = true;
                        break;
                    }
                }
            }

            if(!validador && (el === elApproachesBox || el === elApproachesBoxInput || el === elApproachesDropbox)){
                validador = true;
            }

            if(validador && approachesDropboxRef.current == 0){
                handleApproachesDropbox(1);
            } else if(!validador && approachesDropboxRef.current == 1){
                handleApproachesDropbox(0);
            }
        };
    
        window?.addEventListener('click', handleClick);
    
        return () => {
            window?.removeEventListener('click', handleClick);
        };
    }, []); 

    const filterApproaches = (values: string[]) => {
        const array: approachesInterface[] = [];
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

    const handleChangeInputsApproachesAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.approaches-checkbox');
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const approachesFormated = filterApproaches(values);
                setFormInputs({...formInputs, approaches: approachesFormated});
            }
        } else{
            setFormInputs({...formInputs, approaches: []});
        }
    }

    const handleChangeInputsApproaches = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.approaches-checkbox');
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const approachesFormated = filterApproaches(values);
            setFormInputs({...formInputs, approaches: approachesFormated});
        }
    }

    const placeholder = 'Selecione suas abordagens de atuação:';

    return (
        <>
            <div id='approaches-box'>
                <input type="text"
                className={formInputs.approaches.length !== 0 ? '' : 'error'}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setApproachesSearch(e.target.value);
                }}
                name="approaches-search" ref={inputApproachesSearch} id="approaches-search" 
                placeholder={
                    formInputs.approaches && formInputs.approaches.length === 1
                    ? `1 abordagem selecionada` 
                    : `${formInputs.approaches.length === 0
                        ? placeholder
                        : `${formInputs.approaches.length} abordagens selecionadas` 
                    }`
                }/>
                {approachesDropbox === 1 &&
                    <div id='approaches-dropbox'>
                    {
                        approachesSearch === ''
                        &&
                        <label>
                            <input type="checkbox" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeInputsApproachesAll(e);
                            }} checked={formInputs.approaches.length === options.length ? true : false}/>
                            <p>
                            Selecione todas as opções
                            </p>
                        </label>
                    }
                    {options.map((opcao: approachesInterface) => {
                        const value: string = opcao.value;
                        const label: string = opcao.label;
                        if(value.toLowerCase().indexOf(approachesSearch.toLowerCase()) != -1){
                            return (
                                <label key={value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsApproaches(e);
                                    }} 
                                    name='approaches' 
                                    checked={formInputs.approaches.map(approaches => approaches.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                    className='approaches-checkbox' value={value.toUpperCase()} />
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
            <ErrorAuth errors={errors} type='approaches'/>
        </>
    )
}