import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import { redirect } from 'next/navigation';
import LoginPage from './components/LoginPage';

export default async function Page() {
    
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

    if(!userIsAuthenticated) {
        return (
            <LoginPage />
        );
    } else {
        redirect('/');
    }

}