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
    disponibilidade: DisponibilidadeFiltersProfessionals;
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

export type GeneroFiltersProfessionals = 'T' | 'F' | 'M';
export type DisponibilidadeFiltersProfessionals = 'MA' | 'TA' | 'NO' | 'FDS' | 'TO';