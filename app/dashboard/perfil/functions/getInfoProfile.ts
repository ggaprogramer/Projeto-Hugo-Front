export default async function getInfoProfile(token: string | undefined){
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
        });
        
        const data = await response.json();
        return data;
    }
}