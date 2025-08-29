import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ConsultaComponent from './components/ConsultaComponent';
import { redirect } from 'next/navigation';

interface PageProps {
    params: {
      id: string;
    };
}

/* async function getConsulta(id: string) {
    const professionalAny: ProfessionalAnyInterface = await getAnyProfessional(id);
    return professionalAny;
} */

export default async function Consulta({params}: PageProps) {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    if(userIsAuthenticated?.token && userIsAuthenticated.roles?.length !== 0 && userIsAuthenticated.roles?.indexOf('PROFILE') !== -1){
        return (
            <>
                <ConsultaComponent authToken={userIsAuthenticated?.token} />
            </>
        );
    } else {
        redirect('/auth/login');
    }
}