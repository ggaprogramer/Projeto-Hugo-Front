"use server";

import { cookies } from 'next/headers';
import {Dates} from '../interfaces';

export default async function deleteDayHour(dates: Dates): Promise<boolean>{
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/config-agendamento/delete-hour-day-agendamento`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
            body: JSON.stringify(dates),
        });
        return response.ok;
    }
    return false;
}