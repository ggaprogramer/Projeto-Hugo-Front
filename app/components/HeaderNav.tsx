'use client';

import { useEffect, useRef } from 'react';

export default function HeaderNav(){
    const headerNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            const el = e.target as HTMLElement;
            const hrefAttribute = el?.getAttribute('href');
            if(hrefAttribute) {
                const divElement = window.document.querySelector(hrefAttribute) as HTMLElement;
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
    }, []);

    return (
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
    )
}