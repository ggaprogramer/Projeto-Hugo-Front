import Link from 'next/link';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import ProfessionalPage from './components/ProfessionalsPage';

export default async function Professional() {
    const authToken = cookies().get('auth-token');
    const userIsAuthenticated: boolean | undefined = await functionIsAuthenticated(authToken?.value);

    return (
      <ProfessionalPage userIsAuthenticated={userIsAuthenticated} />
    );
}
