export default async function isAuthenticated(token: string | undefined){
    if(token){
        const urlBack = process.env.NEXT_PUBLIC_BACK_URL;
        const response = await fetch(`${urlBack}/auth/is-authenticated`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({token: token}),
            cache: 'no-store',
        });
        const isAuthenticated = response.ok;
        if(isAuthenticated) return true;
        return false;
    }
}