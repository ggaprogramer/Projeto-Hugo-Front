"use client";

import {QuestionInterface} from '../interfaces';
import {useEffect, useState, useRef, RefObject} from 'react';

export default function Questions(){

    const perguntas = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            const atributte = el?.parentElement?.getAttribute('class');
            const p = el?.parentElement?.children[1];

            if(p?.classList.contains('desocultar')){
                p.classList.remove('desocultar');
                el?.parentElement?.children[0]?.children[0]?.setAttribute('class', 'simbolo-mais'); 
                el?.parentElement?.children[0]?.children[1]?.setAttribute('class', 'simbolo-menos');   
            } else{
                const questions = window.document.querySelectorAll('.pergunta');
                const imgsPlus = window.document.querySelectorAll('.pergunta h3 img:nth-of-type(1)');
                const imgsMinus = window.document.querySelectorAll('.pergunta h3 img:nth-of-type(2)');
                for(let i = 0; i < questions.length; i++){
                    questions[i].children[1]?.setAttribute('class', '');   
                }
                for(let i = 0; i < imgsPlus.length; i++){
                    imgsPlus[i]?.setAttribute('class', 'simbolo-mais');   
                }
                for(let i = 0; i < imgsMinus.length; i++){
                    imgsMinus[i]?.setAttribute('class', 'simbolo-menos');   
                }

                if(atributte && atributte == 'pergunta'){
                    p?.setAttribute('class', 'desocultar');   
                    el?.parentElement?.children[0]?.children[0]?.classList.add('ocultar');  
                    el?.parentElement?.children[0]?.children[1]?.classList.add('desocultar');   
                }
            }
        }
    
        perguntas.current?.addEventListener('click', handleClick);
    
        return () => {
            perguntas.current?.removeEventListener('click', handleClick);
        };
      }, []);

    const getQuestions: () => QuestionInterface[] = () => {
        let perguntas: QuestionInterface[] = [
            {
            order: 0,
            title: 'Como funciona o site e como posso encontrar um terapeuta?',
            description: 'Nós garantimos que todos os seguidores são pessoas reais e ativas no Instagram. Utilizamos métodos orgânicos para crescer nossas contas, como interações genuínas e campanhas de marketing. Isso assegura que os seguidores são autênticos e não bots.',
            },
            {
            order: 0,
            title: 'Como saber qual profissional é o mais indicado para mim?',
            description: 'Após a confirmação do pagamento, a entrega da conta Instagram é realizada de forma segura. Você receberá todos os detalhes de login e instruções para alterar as informações de segurança, como senha e e-mail associado, garantindo total controle sobre a conta.',
            },
            {
            order: 0,
            title: 'Quanto tempo dura uma sessão de terapia?',
            description: 'Sim! Todas as contas vendidas podem ser personalizadas com seu próprio conteúdo. Você terá acesso total para mudar as fotos, biografia, nome de usuário e qualquer outra informação que desejar.',
            },
            {
            order: 0,
            title: 'Terapia online funciona tão bem quanto a presencial?',
            description: 'Aceitamos diversas formas de pagamento, incluindo cartões de crédito, PayPal e transferências bancárias. Todas as transações são seguras e protegidas.',
            },
            {
            order: 0,
            title: 'Quais os primeiros sinais de que preciso de terapia?',
            description: 'Se você esquecer a senha da conta comprada, você pode utilizar a opção de recuperação de senha do Instagram. Caso tenha problemas, oferecemos suporte técnico para ajudá-lo a recuperar o acesso.',
            },
            {
            order: 0,
            title: 'A terapia é confidencial?',
            description: 'Infelizmente, não podemos fornecer acesso prévio às contas por razões de segurança. No entanto, garantimos a autenticidade dos seguidores e oferecemos uma política de reembolso caso a conta não esteja conforme descrito.',
            },
            {
            order: 0,          
            title: 'Qual é o primeiro passo para melhorar minha saúde mental?',
            description: 'Sim! Oferecemos suporte técnico pós-venda para ajudá-lo com qualquer dúvida ou problema que possa surgir. Estamos aqui para garantir que você tenha a melhor experiência possível com sua nova conta Instagram.',
            },
        ]
        for(let i = 0; i < perguntas.length; i++){
            perguntas[i].order = i + 1;
        }

        return perguntas;
    }

    const questions: QuestionInterface[] = getQuestions();

    return (
        <>
            <div className="perguntas">
                <h2>
                    Perguntas frequentes
                    <span></span>
                </h2>
                <div ref={perguntas}>
                    {questions.map(question => {
                        return (
                        <div key={`question-${question.order}`} className="pergunta">
                            <h3 className="titulo4">
                                {question.order}. {question.title}
                                <img src="/simbolo-mais.png" className="simbolo-mais"/>
                                <img src="/simbolo-menos.png" className="simbolo-menos"/>
                            </h3>
                            <p>
                                {question.description}
                            </p>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}