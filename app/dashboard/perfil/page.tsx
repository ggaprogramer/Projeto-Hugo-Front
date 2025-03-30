import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import getInfoProfile from '@dashboard/functions/getInfoProfile';
import { ProfileInfo } from './interfaces';
import Header from '@home/Header';
import Footer from '@home/Footer';
import PerfilPage from './components/PerfilPage';

export default async function Dashboard() {
    const authToken = cookies().get('auth-token');
    
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated(authToken?.value);

    if(userIsAuthenticated) {
        const profileInfo: ProfileInfo = await getInfoProfile(authToken?.value);

        return (
            <>
                <PerfilPage profileInfo={profileInfo} authToken={authToken?.value}/>
            </>
        );
    } else {
        redirect('/auth/login');
    }

}