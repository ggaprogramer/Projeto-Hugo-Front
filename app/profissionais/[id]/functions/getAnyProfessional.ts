"use server";

export default async function getAnyProfessional(id: string){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await fetch(`${urlBack}/professional/any/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + '',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });
    
    const data = await response.json();
    return data;
}