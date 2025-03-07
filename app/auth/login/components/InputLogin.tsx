"use client";

import {LoginFormValues, InputFormLogin} from '../interfaces';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth';

export default function LoginInput(props: InputFormLogin){
    const errors: Errors[] = props.errors;
    let value: string | boolean = props.value;
    const setFormInputs = props.setFormInputs;
    const formInputs = props.formInputs;

    const handleInputFormLogin = (e: React.ChangeEvent<HTMLInputElement> 
        | React.ChangeEvent<HTMLSelectElement>, name: string) => {
        const element = e.target;
        if(name == 'email'){
            setFormInputs({...formInputs, email: element.value});
        }
        else if(name == 'password'){
            setFormInputs({...formInputs, password: element.value});
        }
        else if(name == 'remember-password' && element instanceof HTMLInputElement){
            setFormInputs({...formInputs, rememberPassword: element.checked});
        }
    }

    return (
        <>
        {
            props.inputType === 'checkbox'
            ?
            <label className='inputs-extras'>
                <input 
                type="checkbox" 
                name='remember-password'
                checked={typeof value === 'boolean' ? value : false} 
                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => handleInputFormLogin(e, props.name)}
                />
                <p>
                    Lembrar Senha
                </p>
            </label>
            :
            <>
                <input 
                type={props.inputType} 
                name={props.name} 
                value={typeof value !== 'boolean' ? value : ''} 
                placeholder={props.placeholder}
                onInput={(e: React.ChangeEvent<HTMLInputElement> ) => handleInputFormLogin(e, props.name)}
                />
                <ErrorAuth errors={errors} type={props.name}/>
            </>
        }
        </>
    )
}