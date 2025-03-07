"use client";

import {RegisterFormValues, InputFormRegister} from '../interfaces';
import {OptionType, Errors} from '../../interfaces';
import ErrorAuth from '../../components/ErrorAuth';
import '@auth/styles/input.scss';

export default function PasswordInputForm(props: InputFormRegister){

    const errors: Errors[] = props.errors;
    const formInputs: RegisterFormValues = props.formInputs;
    const setFormInputs: Function = props.setFormInputs;

    const handleInputFormRegister = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
        if(name === 'password1'){
            setFormInputs({...formInputs, password1: e.target.value});
        }
        else if(name === 'password2'){
            setFormInputs({...formInputs, password2: e.target.value});
        }
    };
    return (
        <>
            <input type={props.inputType}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputFormRegister(e, props.name)}
            name={props.name} placeholder={props.placeholder} value={props.value}
            />
            <ErrorAuth errors={errors} type={props.name}/>
        </>
    )
}