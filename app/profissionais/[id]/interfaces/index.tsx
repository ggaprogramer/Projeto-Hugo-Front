import {ProfessionalInfo} from '@dashboard/profissional/interfaces';

export interface ProfessionalPagePropsInterface {
    userIsAuthenticated: string | undefined;
    professional: ProfessionalInfo;
}