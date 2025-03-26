import {Errors} from '@auth/interfaces';

export interface DivInterestsAtualizarFormInterface{
    formInputs: FormAtualizarValues;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    errors: Errors[];
}

export interface FormAtualizarValues {
    name: string;
    username: string;
    email: string;
    interests: string[];
    gender: string;
    phone: string;
    dateBirth: string;
    password: string;
    password1: string;
    password2: string;    
    typeProfile: TypeProfile;
}

export type TypeProfile = 'PROFESSIONAL' | 'PROFILE';

export interface BodyRequestAtualizarForm{
    name: string;
    username: string;
    password1: string;
    password2: string;
    email: string;
    phone: string;
    dateBirth: string;
    interests: string[];
    gender: string;
    typeProfile: TypeProfile;
}

export interface ResponseAtualizarForm {
    status: string;
    type: string | undefined;
    message: string;
}

export interface ProfileInfo {
    name: string;
    username: string;
    email: string;
    interests: string[];
    gender: string;
    phone: string;
    dateBirth: string;
    confirmacaoEmail: boolean;
}
