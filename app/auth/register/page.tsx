import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import { redirect } from 'next/navigation';
import { interestsInterface } from './interfaces'
import RegisterPage from './components/RegisterPage';

export default async function Register() {
    
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated();

    if(!userIsAuthenticated) {
        return (
            <RegisterPage/>
        );
    } else {
        redirect('/');
    }

}