"use client";

import {RegisterFormValues, SelectFormInterface} from '../interfaces';
import {Errors} from '../../interfaces';
import {OptionsSelect} from '../interfaces';
import '@auth/styles/select.scss';
import ErrorAuth from '../../components/ErrorAuth';

export default function SelectForm(props: SelectFormInterface){
    const errors: Errors[] = props.errors;
    const options: OptionsSelect[] = props.options;
    const formInputs: RegisterFormValues = props.formInputs;
    const setFormInputs: Function = props.setFormInputs;

    const handleInputFormRegister = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, type: string) => {
        if(type === 'gender'){
            setFormInputs({...formInputs, gender: e.target.value});
        }
    }

    return (
        <>
            <select 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputFormRegister(e, props.name)}
                value={props.value} name={props.name}>
                <option>{props.placeholder}</option>
                {options?.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                })} 
            </select>
            <ErrorAuth errors={errors} type={props.name}/>
        </>
    )
}