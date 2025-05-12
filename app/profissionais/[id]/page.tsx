import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ProfessionalPage from './components/ProfessionalPage';
import {ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';
import getAnyProfessional from './functions/getAnyProfessional';
import { redirect } from 'next/navigation';

interface PageProps {
    params: {
      id: string;
    };
}

async function getProfessional(id: string) {
    const professionalAny: ProfessionalAnyInterface = await getAnyProfessional(id);
    return professionalAny;
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