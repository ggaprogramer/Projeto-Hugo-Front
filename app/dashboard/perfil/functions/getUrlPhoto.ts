export default async function getUrlPhoto(token: string | undefined, uuid: string){
    if(token && uuid){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/profile/photo/${uuid}`, {
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