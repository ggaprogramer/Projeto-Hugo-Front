import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {redirect } from 'next/navigation';
import RegisterPage from './components/RegisterPage';

export default async function Register() {
    const authToken = cookies().get('auth-token');
    
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated(authToken?.value);

    if(!userIsAuthenticated) {
        return (
            <RegisterPage />
        );
    } else {
        redirect('/');
    }

}