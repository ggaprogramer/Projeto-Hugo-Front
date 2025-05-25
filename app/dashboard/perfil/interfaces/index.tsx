import {Errors} from '@auth/interfaces';
import {interestsInterface} from '@auth/register/interfaces';

export interface DivInterestsAtualizarFormInterface{
    formInputs: FormAtualizarValues;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    valueInterests: interestsInterface[];
    options: interestsInterface[];
    errors: Errors[];
}

export interface FormAtualizarValues {
    name: string;
    username: string;
    email: string;
    interests: interestsInterface[];
    gender: string;
    phone: string;
    file: File | null;
    password: string;
    password1: string;
    password2: string;    
    typeProfile: TypeProfile;
}

export type TypeProfile = 'PROFESSIONAL' | 'PROFILE';

export interface BodyRequestAtualizarForm{
    name: string;
    username: string;
    password: string;
    password1: string;
    password2: string;
    email: string;
    phone: string;
    base64File: string | null;
    mimeType: string | null;
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
    uuid: string;
    name: string;
    username: string;
    email: string;
    interests: interestsInterface[];
    gender: string;
    phone: string;
    dateBirth: string;
    linkPhoto: string | undefined;
    confirmacaoEmail: boolean;
}

export interface ResponseGetUrlPhoto {
    urlPhoto: string | undefined;
}

export interface ControlSessionFilterProfile{
    sessionsProfile: SessionProfile[];
    pageSelected: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
}

export interface SessionFilterProfile{
    pagina: number;
    tamanho: number;
    ordenarPor: string;
    direcao: string;
    nomeProfessional: string | null;
    date: Date | null;
    status: string;
}

export interface SessionProfile{
    id: string;
    linkSession: string;
    professionalId: string;
    professionalName: string;
    linkPhotoProfessional: string;
    active: boolean;
    amount: number;
    statusPayment: string;
    duration: number;
    dateHourSession: Date;
    dateHourSessionFinallized: Date;
    status: string;    
    gender: string;
}
