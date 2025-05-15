import {ProfessionalInfo, ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';

export interface ProfessionalPagePropsInterface {
    userIsAuthenticated: string | undefined;
    professional: ProfessionalAnyInterface;
}

export interface CreateSessionRequest {
    idProfessional: string;
    day: Date;
    hour: string;
}

export interface CreateSessionResponse {
    status: string;
    type: string;
    message: string;
}