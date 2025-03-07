"use client";

import {RegisterFormValues, InputFormRegister} from '../interfaces';
import {Errors} from '../../interfaces';
import { IMaskInput } from 'react-imask';
import '@auth/styles/input.scss';
import ErrorAuth from '../../components/ErrorAuth'

export default function InputForm(props: InputFormRegister){

    const errors: Errors[] = props.errors;
    const formInputs: RegisterFormValues = props.formInputs;
    const setFormInputs: Function = props.setFormInputs;

    const handleInputFormRegister = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
        if(name == 'name'){
            setFormInputs({...formInputs, name: e.target.value});
        }
        else if(name == 'username'){
            setFormInputs({...formInputs, username: e.target.value});
        }
        else if(name == 'email'){
            setFormInputs({...formInputs, email: e.target.value});
        }
        else if(name == 'phone'){
            setFormInputs({...formInputs, phone: e.target.value});
        }
        else if(name == 'password1'){
            setFormInputs({...formInputs, password1: e.target.value});
        }
        else if(name == 'password2'){
            setFormInputs({...formInputs, password2: e.target.value});
        }
    }
    
    if(props.name === 'phone'){
        return (
            <>
                <IMaskInput
                    name={props.name}
                    mask="+55 (00) 00000-0000"
                    placeholder={props.placeholder}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputFormRegister(e, 'phone')}
                    value={formInputs.phone}
                />
                <ErrorAuth errors={errors} type='phone'/>
            </>
        )
    } 
    return (
        <>
            <input type={props.inputType}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputFormRegister(e, props.name)}
            name={props.name} placeholder={props.placeholder} value={props.value}/>
            <ErrorAuth errors={errors} type={props.name}/>
        </>
    )
}