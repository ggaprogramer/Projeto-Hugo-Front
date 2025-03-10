import {Errors} from '@auth/interfaces';
import {TypeProfile} from '@auth/register/interfaces';

export interface LoginFormValues{
    email: string;
    password: string;
    rememberPassword: boolean;
}

export interface InputFormLogin{
    inputType: string;
    name: string;
    placeholder: string;
    value: string | boolean;
    errors: Errors[];
    formInputs: LoginFormValues;
    setFormInputs: Function;
}

export interface responseFormLogin{
    status: string;
    message: string;
    type: string | null;
    token: string | null;
    typeProfile: TypeProfile | null;
}

export interface bodyRequestFormLogin{
    email: string;
    password: string;
    lembrarSenha: boolean;
}