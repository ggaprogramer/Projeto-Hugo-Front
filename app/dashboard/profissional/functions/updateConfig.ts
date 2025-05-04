"use server";

import { cookies } from 'next/headers';
import {bodyConfigAgendamentos} from '../interfaces'

export default async function updateConfig(config: bodyConfigAgendamentos): Promise<boolean>{
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/config-agendamento/update-config`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
            body: JSON.stringify(config),
        });
        return response.ok;
    }
    return false;
}