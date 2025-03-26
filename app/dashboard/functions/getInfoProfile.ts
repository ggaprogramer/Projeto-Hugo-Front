import { ProfileInfo } from '../perfil/interfaces';

export default async function getInfoProfile(token: string | undefined){
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/profile/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            cache: 'no-store',
        });
        
        return await response.json();
    }
}