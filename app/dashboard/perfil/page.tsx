import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import DashboardPerfil from './components/DashboardPerfil';

export default async function Perfil() {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();
    
    if(userIsAuthenticated.token && userIsAuthenticated.roles?.length !== 0){
        return (
            <>
                <DashboardPerfil authToken={userIsAuthenticated.token}/>
            </>
        );
    } else {
        redirect('/auth/login');
    }

}