import {ProfessionalInfo, ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';

export interface ProfessionalPagePropsInterface {
    userIsAuthenticated: string | undefined;
    professional: ProfessionalAnyInterface;
}