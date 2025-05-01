"use server";

export default async function extractProfessionalSpecialties(){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await fetch(`${urlBack}/professional-specialties`, {
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