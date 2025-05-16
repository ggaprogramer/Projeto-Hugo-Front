import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import DashboardPerfil from './components/DashboardPerfil';

export default async function Perfil() {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();
    
    if(userIsAuthenticated?.token && userIsAuthenticated.roles?.length !== 0 && userIsAuthenticated.roles?.indexOf('PROFILE') !== -1){
        return (
            <>
                <DashboardPerfil authToken={userIsAuthenticated?.token}/>
            </>
        );
    } else if(userIsAuthenticated?.token && userIsAuthenticated.roles?.indexOf('PROFESSIONAL') !== -1){
        redirect('/dashboard/profissional');
    } else {
        redirect('/auth/login');
    }

}