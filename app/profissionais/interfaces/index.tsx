import {ProfessionalInfo} from '@dashboard/profissional/interfaces';

export interface ProfessionalsPagePropsInterface {
    userIsAuthenticated: string | undefined;
}

export interface FiltersProfessionals {
    nome: string;
    abordagens: DivMultipleSelectInterface[];
    precoMinimo: string;
    precoMaximo: string;
    especialidades: DivMultipleSelectInterface[];
    interesses: DivMultipleSelectInterface[];
    idiomas: DivMultipleSelectLanguageInterface[];
    genero: GeneroFiltersProfessionals;
    disponibilidades: DisponibilidadeFiltersProfessionals[];
}

export interface DivMultipleSelectInterface {
    value: string;
    label: string;
}

export interface DivMultipleSelectLanguageInterface {
    value: string;
    label: string;
    level: string;
}

export interface DivMultipleSelectPropsInterface {
    formInputs: FiltersProfessionals;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    options: DivMultipleSelectInterface[] | DivMultipleSelectLanguageInterface[];
    formInputsName: string;
    formOptions: DivMultipleSelectInterface[] | DivMultipleSelectLanguageInterface[];
}

export interface OptionsFiltersInterface {
    abordagens: DivMultipleSelectInterface[];
    especialidades: DivMultipleSelectInterface[];
    interesses: DivMultipleSelectInterface[];
    idiomas: DivMultipleSelectLanguageInterface[];
}

export type GeneroFiltersProfessionals = 'TODOS' | 'FEMININO' | 'MASCULINO' | 'OUTROS';
export type DisponibilidadeFiltersProfessionals = 'MANHA' | 'TARDE' | 'NOITE' | 'FDS' | 'TODOS';

export interface BodyProfessionalFilter {
    pagina: number,
    tamanho: number,
    ordenarPor: string,
    direcao: string,
    nome: string,
    abordagens: string[];
    especialidades: string[];
    interesses: string[];
    idiomas: string[];
    precoMinimo: number;
    precoMaximo: number;
    genero: GeneroFiltersProfessionals,
    disponibilidades: DisponibilidadeFiltersProfessionals[],
}