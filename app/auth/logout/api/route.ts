import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';

export async function DELETE() {    
    const authToken = cookies().get('auth-token');
    if(authToken){
        const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

        if(userIsAuthenticated?.token && userIsAuthenticated.roles?.length !== 0){
          cookies().delete('auth-token');
          return new Response(null, {status: 200});
        }
        return new Response(null, {status: 400});
    } else{
        return new Response(null, {status: 400});
    }
  }