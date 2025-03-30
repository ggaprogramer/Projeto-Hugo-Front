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
    interests: interestsInterface[];
}

export interface SelectFormInterface{
    name: string;
    value: string | string[];
    placeholder: string;
    errors: Errors[];
    options: OptionsSelect[];
    formInputs: RegisterFormValues;
    setFormInputs: Function;
}

export type OptionsSelect = {
    value: string;
    label: string;
}

export interface RegisterFormValues {
    name: string;
    username: string;
    email: string;
    interests: string[];
    gender: string;
    phone: string;
    dateBirth: string;
    password1: string;
    password2: string;
    termos: Boolean;
    typeProfile: TypeProfile;
}

export type TypeProfile = 'PROFESSIONAL' | 'PROFILE';

export interface responseRegisterForm {
    status: string;
    type: string | undefined;
    message: string;
}

export interface bodyRequestRegisterForm{
    name: string;
    username: string;
    password1: string;
    password2: string;
    email: string;
    roles: Roles[];
    phone: string;
    dateBirth: string;
    interests: string[];
    gender: string;
    typeProfile: TypeProfile;
}

export type Roles = 'USER' | 'PROFESSIONAL' | 'PROFILE';


export interface interestsInterface {
    value: string;
    label: string;
}
