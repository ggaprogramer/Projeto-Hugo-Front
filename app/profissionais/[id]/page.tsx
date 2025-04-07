import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import ProfessionalPage from './components/ProfessionalPage';

export default async function Professional() {

    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

    return (
        <>
            <ProfessionalPage userIsAuthenticated={userIsAuthenticated} />
        </>
    );
}