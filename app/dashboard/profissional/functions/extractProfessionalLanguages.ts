"use server";

export default async function extractProfessionalLanguages(){
    const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
    const response = await fetch(`${urlBack}/professional-languages`, {
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