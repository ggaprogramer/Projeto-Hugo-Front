'use client';

import {DivSpecialtiesAtualizarFormInterface} from '../interfaces';
import {OptionType, Errors} from '@auth/interfaces';
import {useMemo, useState, useRef, useEffect} from 'react';
import ErrorAuth from '@auth/components/ErrorAuth';
import {specialtiesInterface} from '../interfaces';

export default function DivSpecialtiesAtualizarProfissional(props: DivSpecialtiesAtualizarFormInterface){
    const formAtualizar = props.formAtualizar;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const errors: Errors[] = props.errors;
    const options = props.options;

    const [specialtiesSearch, setSpecialtiesSearch] = useState('');
    const [specialtiesDropbox, setSpecialtiesDropbox] = useState(0);
    const inputSpecialtiesSearch = useRef<HTMLInputElement>(null);

    const handleInputSpecialtiesEnter = () => {
        if(specialtiesDropbox === 0){
            setSpecialtiesDropbox(1);
        }
    }

    const handleInputSpecialtiesLeave = () => {
        if(specialtiesDropbox === 1){
            setSpecialtiesDropbox(0);
            inputSpecialtiesSearch.current?.blur();
        }
    }

    const filterSpecialties = (values: string[]) => {
        const array: specialtiesInterface[] = [];
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

    const handleChangeInputsSpecialtiesAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.specialties-checkbox');
            let values: string[] = [];
            if(checkboxes){
                values = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                const specialtiesFormated = filterSpecialties(values);
                setFormInputs({...formInputs, specialties: specialtiesFormated});
            }
        } else{
            setFormInputs({...formInputs, specialties: []});
        }
    }

    const handleChangeInputsSpecialties = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formAtualizar?.current?.querySelectorAll<HTMLInputElement>('.specialties-checkbox');
        let values: string[] = [];
        if(checkboxes){
            values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            const specialtiesFormated = filterSpecialties(values);
            setFormInputs({...formInputs, specialties: specialtiesFormated});
        }
    }

    const placeholder = 'Selecione suas especialidades:';

    return (
        <>
            <div id='specialties-box' onMouseLeave={handleInputSpecialtiesLeave}>
                <input type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSpecialtiesSearch(e.target.value);
                }}
                onFocus={handleInputSpecialtiesEnter}
                name="specialties-search" ref={inputSpecialtiesSearch} id="specialties-search" 
                placeholder={
                    formInputs.specialties && formInputs.specialties.length === 1
                    ? `1 especialidade selecionada` 
                    : `${formInputs.specialties.length === 0
                        ? placeholder
                        : `${formInputs.specialties.length} especialidades selecionadas` 
                    }`
                }/>
                {specialtiesDropbox === 1 &&
                    <div id='specialties-dropbox'>
                    {
                        specialtiesSearch === ''
                        &&
                        <label>
                            <input type="checkbox" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeInputsSpecialtiesAll(e);
                            }} checked={formInputs.specialties.length === options.length ? true : false}/>
                            <p>
                            Selecione todas as opções
                            </p>
                        </label>
                    }
                    {options.map((opcao: specialtiesInterface) => {
                        const value: string = opcao.value;
                        const label: string = opcao.label;
                        if(value.toLowerCase().indexOf(specialtiesSearch.toLowerCase()) != -1){
                            return (
                                <label key={value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsSpecialties(e);
                                    }} 
                                    name='specialties' 
                                    checked={formInputs.specialties.map(specialties => specialties.value).indexOf(value.toUpperCase()) !== -1 ? true : false}
                                    className='specialties-checkbox' value={value.toUpperCase()} />
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
            <ErrorAuth errors={errors} type='specialties'/>
        </>
    )
}