import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import {isAuthenticatedInterface} from '@auth/interfaces';
import { redirect } from 'next/navigation';
import { interestsInterface } from './interfaces'
import RegisterPage from './components/RegisterPage';

export default async function Register() {
    
    const userIsAuthenticated: isAuthenticatedInterface = await functionIsAuthenticated();

    if(!userIsAuthenticated?.token && userIsAuthenticated?.roles?.length !== 0){
        return (
            <RegisterPage/>
        );
    } else {
        redirect('/');
    }

}