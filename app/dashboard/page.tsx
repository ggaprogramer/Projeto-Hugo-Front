import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import {redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';

export default async function Dashboard() {
    const authToken = cookies().get('auth-token');
    
    const userIsAuthenticated: boolean | undefined = await functionIsAuthenticated(authToken?.value);

    if(userIsAuthenticated) {
        return (
            <h2>
                DASHBOARD
            </h2>
        );
    } else {
        redirect('/auth/login');
    }

}
