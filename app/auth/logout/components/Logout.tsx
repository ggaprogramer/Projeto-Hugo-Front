'use client';

import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import { useRouter } from 'next/navigation';

export default function Logout(){
    const router = useRouter();

    const handleClick = async () => {
        const urlFront = process.env.NEXT_PUBLIC_FRONT_URL;
        const response = await fetch(`${urlFront}/auth/logout/api`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            router.push('/auth/login');
            window.location.reload();
        } else {
            router.push('/');
        }
    }

    return (
        <button onClick={handleClick}>Sair</button>
    )
}
