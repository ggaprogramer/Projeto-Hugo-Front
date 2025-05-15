"use server";

import { cookies } from 'next/headers';
import {CreateSessionRequest} from '../interfaces';

export default async function createSession(body: CreateSessionRequest){
    const token = cookies().get('auth-token');
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/session/create`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token.value,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        return data;
    }
}