export interface ProfessionalsPagePropsInterface {
    userIsAuthenticated: boolean | undefined;
}

export interface FiltersProfessionals {
    nome: string;
    abordagem: string;
    precoMinimo: string;
    precoMaximo: string;
    especialidade: string;
    genero: GeneroFiltersProfessionals;
    disponibilidade: DisponibilidadeFiltersProfessionals;
}

export type GeneroFiltersProfessionals = 'T' | 'F' | 'M';
export type DisponibilidadeFiltersProfessionals = 'MA' | 'TA' | 'NO' | 'FDS' | 'TO';