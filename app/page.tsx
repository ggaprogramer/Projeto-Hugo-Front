import Link from 'next/link';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import HomePage from './components/HomePage';

export default async function Home() {
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

    return (
      <>
        <HomePage userIsAuthenticated={userIsAuthenticated} />
      </>
    );
}
