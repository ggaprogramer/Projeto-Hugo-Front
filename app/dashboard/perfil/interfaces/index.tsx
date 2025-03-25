import {Errors} from '@auth/interfaces';

export interface DivInterestsAtualizarFormInterface{
    formInputs: RegisterFormAtualizarValues;
    formRegister: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    errors: Errors[];
}

export interface RegisterFormAtualizarValues {
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