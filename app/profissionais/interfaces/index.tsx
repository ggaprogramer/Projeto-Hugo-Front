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
    genero: GeneroFiltersProfessionals;
    disponibilidade: DisponibilidadeFiltersProfessionals;
}

export interface DivMultipleSelectInterface {
    value: string;
    label: string;
}

export interface DivMultipleSelectPropsInterface {
    formInputs: FiltersProfessionals;
    formAtualizar: React.RefObject<HTMLFormElement>;
    setFormInputs: Function;
    options: DivMultipleSelectInterface[];
    formInputsName: string;
    formOptions: DivMultipleSelectInterface[];
}

export interface OptionsFiltersInterface {
    abordagens: DivMultipleSelectInterface[];
    especialidades: DivMultipleSelectInterface[];
    interesses: DivMultipleSelectInterface[];
}

export type GeneroFiltersProfessionals = 'T' | 'F' | 'M';
export type DisponibilidadeFiltersProfessionals = 'MA' | 'TA' | 'NO' | 'FDS' | 'TO';