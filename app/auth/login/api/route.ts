import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const { token, lembrarSenha } = body;

  let validate = 1;

  if(lembrarSenha){
    validate = 5;
  }

  cookies().set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    secure: false, 
    path: '/', 
    maxAge: 60 * 60 * 24 * validate,
  });

  return new Response(null, {status: 200});
}
