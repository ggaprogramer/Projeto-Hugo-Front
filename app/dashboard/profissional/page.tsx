import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import DashboardProfissional from './components/DashboardProfissional';

export default async function Profissional() {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();
    
    if(userIsAuthenticated.token && userIsAuthenticated.roles?.length !== 0 && userIsAuthenticated.roles?.indexOf('PROFESSIONAL') !== -1){
        return (
            <>
                <DashboardProfissional authToken={userIsAuthenticated.token}/>
            </>
        );
    } else if(userIsAuthenticated.token && userIsAuthenticated.roles?.indexOf('PROFILE') !== -1){
        redirect('/dashboard/perfil');
    } else {
        redirect('/auth/login');
    }

}