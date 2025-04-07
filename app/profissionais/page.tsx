import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import ProfessionalsPage from './components/ProfessionalsPage';
import Header from '@home/Header';
import Footer from '@home/Footer';

export default async function Professional() {

    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

    return (
      <>
        <ProfessionalsPage userIsAuthenticated={userIsAuthenticated} />
      </>
    );
}
