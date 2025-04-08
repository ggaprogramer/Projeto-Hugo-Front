import Link from 'next/link';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import HomePage from './components/HomePage';
import {isAuthenticatedInterface} from '@auth/interfaces';

export default async function Home() {
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    return (
      <>
        <HomePage userIsAuthenticated={userIsAuthenticated.token} />
      </>
    );
}
