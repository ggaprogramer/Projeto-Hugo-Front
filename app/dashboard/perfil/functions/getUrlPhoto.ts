"use server";

import { cookies } from 'next/headers';

export default async function getUrlPhoto(uuid: string){
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value && uuid){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/profile/photo/${uuid}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
        });
        
        const data = await response.json();
        return data;
    }
}