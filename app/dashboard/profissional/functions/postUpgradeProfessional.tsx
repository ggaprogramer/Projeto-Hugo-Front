"use server";

import { cookies } from 'next/headers';
import {BodyRequestAtualizarForm} from '../interfaces';

export default async function postUpgradeProfessional(body: BodyRequestAtualizarForm){
    const token = cookies().get('auth-token');
    const value = token?.value;
    if(value){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/professional/update`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }
}