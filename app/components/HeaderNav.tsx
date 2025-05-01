'use client';

import { useEffect, useRef } from 'react';
import {HeaderNavPropsInterface} from '../interfaces';
import Link from 'next/link';

export default function HeaderNav(props: HeaderNavPropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;
    const headerNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!userIsAuthenticated){
            const handleClick = (e: MouseEvent) => {
                e.preventDefault();
                const el = e.target as HTMLElement;
                const hrefAttribute = el?.getAttribute('href');
                if(hrefAttribute) {
                    const divElement = window?.document?.querySelector(hrefAttribute) as HTMLElement;
                    const to = divElement?.offsetTop;

                    window.scroll({
                        top: to - 100,
                        behavior: 'smooth'
                    })
                }
            }

            headerNav.current?.addEventListener('click', handleClick);
        
            return () => {
                headerNav.current?.removeEventListener('click', handleClick);
            };
        }
    }, []);

    return (
        <>
            {
                !userIsAuthenticated 
                ?
                <nav ref={headerNav}>
                    <a href='.home'>
                        Home
                        <span></span>  
                    </a>
                    <a href='.bio'>
                        Sobre Nós
                        <span></span> 
                    </a>
                    <a href='.servicos'>
                        Benefícios
                        <span></span> 
                    </a>
                    <a href='.instrucoes'>
                        Como Funciona?
                        <span></span> 
                    </a>
                    <a href='.passos'>
                        Dicas
                        <span></span> 
                    </a>
                    <a href='.perguntas'>
                        Dúvidas
                        <span></span> 
                    </a>
                </nav>
                :
                <nav ref={headerNav}>
                    <Link href='/profissionais'>
                        Profissionais
                        <span></span>  
                    </Link>
                </nav>
            }
        </>
    )
}