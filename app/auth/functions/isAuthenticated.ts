"use server";

import { cookies } from 'next/headers';

export default async function isAuthenticated(){
    const token = cookies().get('auth-token');
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/auth/is-authenticated`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token.value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({token: token.value}),
            cache: 'no-store',
        });
        const data = await response.json();
        const getToken = data?.token;

        if(response.ok && getToken) return getToken;
    }
}