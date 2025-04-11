"use server";

import { cookies } from 'next/headers';

export default async function extractProfessionalLanguages(){
    const token = cookies().get('auth-token');
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/professional-languages`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store'
        });
        return await response.json();
    }
}