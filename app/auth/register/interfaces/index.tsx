import {Errors, OptionType} from '../../interfaces';

export interface InputFormRegister{
    inputType: string;
    name: string;
    placeholder: string;
    value: string;
    errors: Errors[];
    formInputs: RegisterFormValues;
    setFormInputs: Function;
}

export interface DivInterestsFormInterface{
    formInputs: RegisterFormValues;
    formRegister: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    errors: Errors[];
}

export interface SelectFormInterface{
    name: string;
    value: string | string[];
    errors: Errors[];
    formInputs: RegisterFormValues;
    setFormInputs: Function;
    opcoes: OptionType[] | null;
    ages: string[] | null;
    placeholder: string;
}

export interface RegisterFormValues {
    name: string;
    username: string;
    email: string;
    interests: string[];
    phone: string;
    age: string;
    password1: string;
    password2: string;
    termos: Boolean;
}

export interface responseRegisterForm {
    status: string;
    type: string | undefined;
    message: string;
}

export interface bodyRequestRegisterForm{
    username: string;
    password1: string;
    password2: string;
    email: string;
    roles: ["USER"];
    phone: string;
    age: string;
    interests: string[];
}