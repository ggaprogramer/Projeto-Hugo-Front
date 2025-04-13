"use server";

export default async function extractProfessionalApproaches(){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await fetch(`${urlBack}/professional-approaches`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + '',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
    });
    return await response.json();
}