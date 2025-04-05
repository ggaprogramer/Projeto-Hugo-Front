"use client";

import Logout from '@auth/logout/components/Logout';
import Link from 'next/link';
import {HeaderHomePropsInterface} from '../interfaces';
import '../styles/header.scss';
import HeaderNav from './HeaderNav';
import {useEffect, useState, useRef, RefObject} from 'react';

export default function Header(props: HeaderHomePropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;

    const botaoMobile = useRef<HTMLDivElement>(null);
    const botaoMobileSpan1 = useRef<HTMLDivElement>(null);
    const botaoMobileSpan2 = useRef<HTMLDivElement>(null);
    const botaoMobileSpan3 = useRef<HTMLDivElement>(null);
    const botaoMobileDiv = useRef<HTMLDivElement>(null);

    const handleClickMobile = () => {
        botaoMobileDiv?.current?.classList.toggle('mobile-expand');
    }

    return (
        <>
            <img src="/whatsapp.png" id='btn-whatsapp-fixed' alt="" />
            <header className='cabecalho-invisivel'></header>
            <header className="cabecalho">
                <div>
                    <Link href="/">
                        <img src="/logo.png" alt="" />
                        <h2>
                            Terapia
                        </h2>
                    </Link>
                    {<HeaderNav userIsAuthenticated={userIsAuthenticated}/>}
                    <div className='botoes'>
                        {
                            !userIsAuthenticated 
                            ?
                            <Link href='/auth/login'>Login</Link>
                            :
                            <>
                                <Link href='/dashboard/perfil'>Dashboard</Link>
                                <Logout/>
                            </>
                        }
                    </div>
                </div>
            </header>
            <header className="cabecalho-mobile">
                <div>
                    <Link href="/">
                        <img src="/logo.png" alt="" />
                        <h2>
                            Terapia
                        </h2>
                    </Link>
                    <div onClick={handleClickMobile} className='botao-mobile' ref={botaoMobile}>
                        <span ref={botaoMobileSpan1}></span>
                        <span ref={botaoMobileSpan2}></span>
                        <span ref={botaoMobileSpan3}></span>
                    </div>
                </div>
                <div ref={botaoMobileDiv}>
                {<HeaderNav userIsAuthenticated={userIsAuthenticated}/>}
                    <div className='botoes'>
                        {
                            !userIsAuthenticated 
                            ?
                            <Link href="/auth/login" onClick={() => window.location.reload()}>
                                Login
                            </Link>
                            :
                            <>
                                <Link href='/dashboard/perfil'>Dashboard</Link>
                                <Logout/>
                            </>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}