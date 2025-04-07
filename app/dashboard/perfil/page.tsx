import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import DashboardPerfil from './components/DashboardPerfil';

export default async function Perfil() {
    const authToken = cookies().get('auth-token');
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();
    
    if(userIsAuthenticated) {
        return (
            <>
                <DashboardPerfil authToken={authToken?.value}/>
            </>
        );
    } else {
        redirect('/auth/login');
    }

}