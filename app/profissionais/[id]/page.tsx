import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import ProfessionalPage from './components/ProfessionalPage';
import Header from '@home/Header';
import Footer from '@home/Footer';

export default async function Professional() {
    const authToken = cookies().get('auth-token');
    const userIsAuthenticated: boolean | undefined = await functionIsAuthenticated(authToken?.value);

    return (
        <>
            <Header userIsAuthenticated={userIsAuthenticated}/>
            <ProfessionalPage userIsAuthenticated={userIsAuthenticated} />
            <Footer userIsAuthenticated={userIsAuthenticated}/>
        </>
    );
}