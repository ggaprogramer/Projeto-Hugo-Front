import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import functionIsAuthenticated from '@auth/functions/isAuthenticated';
import getInfoProfile from '@dashboard/functions/getInfoProfile';
import { ProfileInfo } from './perfil/interfaces';
import Header from '@home/Header';
import Footer from '@home/Footer';
import './styles/layout.scss';
import DashboardNavigation from './components/DashboardNavigation';

export default async function Dashboard({children}: Readonly<{children: React.ReactNode}>) {
    const authToken = cookies().get('auth-token');
    
    const userIsAuthenticated: string | undefined = await functionIsAuthenticated(authToken?.value);

    if(userIsAuthenticated) {
        return (
            <>
                <Header userIsAuthenticated={userIsAuthenticated}/>
                <DashboardNavigation children={children}/>
                <Footer userIsAuthenticated={userIsAuthenticated}/>
            </>
        );
    } else {
        redirect('/auth/login');
    }

}