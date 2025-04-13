'use client'

import { usePathname } from 'next/navigation';
import Header from '@home/Header';
import Footer from '@home/Footer';
import {isAuthenticatedInterface} from '@auth/interfaces';

export default function RootLayoutPage(props: {children: Readonly<React.ReactNode>, userIsAuthenticated: isAuthenticatedInterface}){
    const userIsAuthenticated = props.userIsAuthenticated;
    const children = props.children;
    
    const pathname = usePathname();

    let isAuth: boolean = false;
    if(pathname.indexOf('/auth') !== -1){
        isAuth = true;
    } 

    return (
        <>
            {!isAuth && <Header userIsAuthenticated={userIsAuthenticated} />}
            {children}
            {!isAuth && <Footer userIsAuthenticated={userIsAuthenticated} />}
        </>
    )
}