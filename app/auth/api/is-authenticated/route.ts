import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const authToken = cookies().get('auth-token');

  if (!authToken) {
      return new Response(null, { status: 400 });
  } else{
      const userIsAuthenticated = await isAuthenticated(authToken.value);

      if(userIsAuthenticated){
        return new Response(null, { status: 200 });
      } else{
        return new Response(null, { status: 403 });
      }
  }
}

async function isAuthenticated(token: string){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await fetch(`${urlBack}/auth/is-authenticated`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({token: token})
    });
    const isAuthenticated = response.ok;
    if(isAuthenticated) return true;
    return false;
}