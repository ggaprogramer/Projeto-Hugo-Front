import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import { redirect } from 'next/navigation';
import LoginPage from './components/LoginPage';

export default async function Page() {
    
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    if(!userIsAuthenticated?.token) {
        return (
            <LoginPage />
        );
    } else {
        redirect('/');
    }

}