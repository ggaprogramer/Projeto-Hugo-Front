import Link from 'next/link';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import HomePage from './components/HomePage';

export default async function Home() {
    const authToken = cookies().get('auth-token');
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated(authToken?.value);

    return (
      <>
        <HomePage userIsAuthenticated={userIsAuthenticated} />
      </>
    );
}
