"use server";

import { cookies } from 'next/headers';
import {BodyRequestAtualizarForm} from '../interfaces';

export default async function extractConfigProfessional(){
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/config-agendamento/extract-config`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            cache: 'no-store',
        });
        return await response.json();
    }
}