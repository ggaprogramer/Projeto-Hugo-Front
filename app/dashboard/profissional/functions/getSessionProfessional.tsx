"use server";

import { cookies } from 'next/headers';
import {SessionFilterProfessional} from '../interfaces';

export default async function getSessionProfessional(body: SessionFilterProfessional){
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/session/professional`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
            body: JSON.stringify(body)
        });
        const json = await response.json();
        return json;
    }
}