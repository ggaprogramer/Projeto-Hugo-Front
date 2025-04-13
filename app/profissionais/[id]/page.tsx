import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ProfessionalPage from './components/ProfessionalPage';

export default async function Professional() {

    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    return (
        <>
            <ProfessionalPage userIsAuthenticated={userIsAuthenticated?.token} />
        </>
    );
}