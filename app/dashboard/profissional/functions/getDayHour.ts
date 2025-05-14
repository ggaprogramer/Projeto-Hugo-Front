"use server";

import { cookies } from 'next/headers';

export default async function getDayHour(id: string){
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/config-agendamento/get-agendamento/${id}`, {
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