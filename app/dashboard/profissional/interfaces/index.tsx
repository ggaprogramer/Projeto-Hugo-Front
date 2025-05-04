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

export interface DivApproachesAtualizarFormInterface{
    formInputs: FormAtualizarValues;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    valueApproaches: approachesInterface[];
    options: approachesInterface[];
    errors: Errors[];
}

export interface DivSpecialtiesAtualizarFormInterface{
    formInputs: FormAtualizarValues;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    valueSpecialties: specialtiesInterface[];
    options: specialtiesInterface[];
    errors: Errors[];
}

export interface DivLanguagesAtualizarFormInterface{
    formInputs: FormAtualizarValues;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    valueLanguages: languagesInterface[];
    options: languagesInterface[];
    errors: Errors[];
}


export interface FormAtualizarValues {
    name: string;
    username: string;
    email: string;
    interests: interestsInterface[];
    approaches: approachesInterface[];
    specialties: specialtiesInterface[];
    languages: languagesInterface[];
    gender: string;
    phone: string;
    description: string;
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
    description: string;
    base64File: string | null;
    mimeType: string | null;
    interests: string[];
    approaches: string[];
    specialties: string[];
    languages: string[];
    gender: string;
    typeProfile: TypeProfile;
}

export interface ResponseAtualizarForm {
    status: string;
    type: string | undefined;
    message: string;
}

export interface ProfessionalInfo {
    uuid: string;
    name: string;
    username: string;
    email: string;
    interests: interestsInterface[];
    approaches: approachesInterface[];
    specialties: specialtiesInterface[];
    languages: languagesInterface[];
    gender: string;
    phone: string;
    crp: string;
    description: string;
    dateBirth: string;
    linkPhoto: string | undefined;
    confirmacaoEmail: boolean;
    registrationCompleted: boolean;
}

export interface approachesInterface {
    value: string;
    label: string;
}

export interface specialtiesInterface {
    value: string;
    label: string;
}

export interface languagesInterface {
    value: string;
    label: string;
    level: string;
}

export interface optionsClientInterface {
    interests: interestsInterface[];
    approaches: approachesInterface[];
    specialties: specialtiesInterface[];
    languages: languagesInterface[];
}

export interface ResponseGetUrlPhoto {
    urlPhoto: string | undefined;
}

export interface Dates {
    day: Date,
    hours: string[]
}

export interface bodyConfigAgendamentos {
    price: number | undefined;
    duration: number | undefined;
}

export interface ConfigurationAgendamentos {
    precoAgendamento: string;
    duracaoAgendamento: string;
    datasAgendamentos: Dates[];
}
