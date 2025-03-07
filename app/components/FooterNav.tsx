"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function FooterNav(){
    const footerNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
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
    )
}