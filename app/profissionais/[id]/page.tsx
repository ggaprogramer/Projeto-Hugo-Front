import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ProfessionalPage from './components/ProfessionalPage';
import {ProfessionalInfo} from '@dashboard/profissional/interfaces';
import getInfoProfessional from '@dashboard/profissional/functions/getInfoProfessional';
import { redirect } from 'next/navigation';

interface PageProps {
    params: {
      id: string;
    };
}

async function getProfessional(id: string) {
    const professionalInfo: ProfessionalInfo = await getInfoProfessional();
    return professionalInfo;
}

export default async function Professional({params}: PageProps) {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    if(userIsAuthenticated?.token){
        const professional = await getProfessional(params.id);
        return (
            <>
                <ProfessionalPage professional={professional} userIsAuthenticated={userIsAuthenticated?.token} />
            </>
        );
    } else {
        redirect('/auth/login');
    }
}