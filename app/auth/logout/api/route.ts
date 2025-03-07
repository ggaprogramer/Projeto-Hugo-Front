import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';

export async function DELETE() {    
    const authToken = cookies().get('auth-token');
    if(authToken){
        const userIsAuthenticated: boolean | undefined = await functionIsAuthenticated(authToken?.value);

        if(userIsAuthenticated){
          cookies().delete('auth-token');
          return new Response(null, {status: 200});
        }
        return new Response(null, {status: 400});
    } else{
        return new Response(null, {status: 400});
    }
  }