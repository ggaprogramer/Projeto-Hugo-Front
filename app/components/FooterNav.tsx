"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {FooterNavPropsInterface} from '../interfaces';

export default function FooterNav(props: FooterNavPropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;
    const footerNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!userIsAuthenticated){
            const handleClick = (e: MouseEvent) => {
                e.preventDefault();
                const el = e.target as HTMLElement;
                const hrefAttribute = el?.getAttribute('href');
                if(hrefAttribute) {
                    const divElement = window.document.querySelector(hrefAttribute) as HTMLElement;
                    const to = divElement?.offsetTop;

                    window.scroll({
                        top: to - 200,
                        behavior: 'smooth'
                    })
                }
            }

            footerNav.current?.addEventListener('click', handleClick);
        
            return () => {
                footerNav.current?.removeEventListener('click', handleClick);
            };
        }
    }, []);

    return (
        <>
            {
                !userIsAuthenticated 
                ?
                <div ref={footerNav} className="rodape-coluna">
                    <h2>
                        Links Rápidos
                    </h2>
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
                </div>
                :
                <div ref={footerNav} className="rodape-coluna">
                    <h2>
                        Links Rápidos
                    </h2>
                    <Link href='/profissionais'>
                        Profissionais
                        <span></span>  
                    </Link>
                </div>
            }
        </>
    )
}