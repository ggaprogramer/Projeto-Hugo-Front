import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import ProfessionalsPage from './components/ProfessionalsPage';

export default async function Professional() {

    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    return (
      <>
        <ProfessionalsPage userIsAuthenticated={userIsAuthenticated?.token} />
      </>
    );
}
