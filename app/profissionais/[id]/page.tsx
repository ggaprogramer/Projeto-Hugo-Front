import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ProfessionalPage from './components/ProfessionalPage';
import {ProfessionalInfo} from '@dashboard/profissional/interfaces';
import getAnyProfessional from './functions/getAnyProfessional';
import { redirect } from 'next/navigation';

interface PageProps {
    params: {
      id: string;
    };
}

async function getProfessional(id: string) {
    const professionalInfo: ProfessionalInfo = await getAnyProfessional(id);
    return professionalInfo;
}

export default async function Professional({params}: PageProps) {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    const professional = await getProfessional(params.id);
    return (
        <>
            <ProfessionalPage professional={professional} userIsAuthenticated={userIsAuthenticated?.token} />
        </>
    );
}