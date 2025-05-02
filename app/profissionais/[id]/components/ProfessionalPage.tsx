"use client";

import {ProfessionalPagePropsInterface} from '../interfaces';
import '../styles/professional.scss';
import AboutProfessional from '../components/AboutProfessional';
import ReviewsProfessional from '../components/ReviewsProfessional';
import AgendamentoProfessional from '../components/AgendamentoProfessional';
import {useRef, useState, useEffect} from 'react';

export default function ProfessionalPage(props: ProfessionalPagePropsInterface){
    const professional = props.professional;
    const userIsAuthenticated = props.userIsAuthenticated;

    const [navegacao, setNavegacao] = useState(0);

    return (
        <>
            <div className='container-professional'>
                <div>
                    <div className='info-professional-one'>
                        <div className='photo'>
                            {
                                professional.linkPhoto
                                ?
                                <img src={professional.linkPhoto} alt="" />
                                :
                                <img src="/user.png" alt="" />
                            }
                        </div>
                        <div className='info-one-intern'>
                            <div className='info-first'>
                                <h2>
                                    {professional.gender === 'MULHER' ? 'Dra. ' : 'Dr. '} {professional.name}
                                </h2>
                                <p>
                                    Psicóloga Clínica
                                </p>
                                <p>
                                    <strong>CRP:</strong> {professional.crp}
                                </p>
                            </div>
                            <div className='avaliacao'>
                                <div>
                                    <img src="/estrela-preenchida.png" alt="" />
                                    <img src="/estrela-preenchida.png" alt="" />
                                    <img src="/estrela-preenchida.png" alt="" />
                                    <img src="/estrela-preenchida.png" alt="" />
                                    <img src="/estrela-cinza.png" alt="" />
                                </div>
                                <p>
                                    (128 avaliações)
                                </p>
                            </div>
                            <div className='info-consultation'>
                                <div className='info-preco'>
                                    <img src="/dinheiro.png" alt="" />
                                    <div>
                                        <strong>
                                            R$ 180,00 / sessão
                                        </strong>
                                        <p>
                                            Duração: 50 minutos
                                        </p>
                                    </div>
                                </div>
                                <div className='info-disponibilidade'>
                                    <img src="/relogio.png" alt="" />
                                    <div>
                                        <strong>
                                            Próxima disponibilidade:
                                        </strong>
                                        <p>
                                            Hoje
                                        </p>
                                    </div>
                                </div>
                                <div className='info-plataforma'>
                                    <img src="/camera.png" alt="" />
                                    <div>
                                        <strong>
                                            Consulta online:
                                        </strong>
                                        <p>
                                            Pelo Google Meet ou Zoom
                                        </p>
                                    </div>
                                </div>
                                <div className='info-botoes'>
                                    <button onClick={() => setNavegacao(2)}>Agendar consulta</button>
                                    <button>Enviar mensagem</button>
                                </div>
                                <div className='info-midia'>
                                    <button>
                                        <img src="/compartilhar.png" alt="" />
                                    </button>
                                    <button>
                                        <img src="/coração-vazio.png" alt="" />
                                    </button>
                                    <button>
                                        <img src="/salvar-vazio.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='info-professional-two'>
                        <div className='info-navegacao'>
                            {
                                navegacao === 0
                                ?
                                <button onClick={() => setNavegacao(0)} className='selected'>
                                    <p>Sobre</p>
                                    <span></span>
                                </button>
                                :
                                <button onClick={() => setNavegacao(0)}>
                                    <p>Sobre</p>
                                    <span></span>
                                </button>
                            }
                            {
                                navegacao === 1
                                ?
                                <button onClick={() => setNavegacao(1)} className='selected'>
                                    <p>Avaliações</p>
                                    <span></span>
                                </button>
                                :
                                <button onClick={() => setNavegacao(1)}>
                                    <p>Avaliações</p>
                                    <span></span>
                                </button>
                            }
                            {
                                navegacao === 2
                                ?
                                <button onClick={() => setNavegacao(2)} className='selected'>
                                    <p>Agendamento</p>
                                    <span></span>
                                </button>
                                :
                                <button onClick={() => setNavegacao(2)}>
                                    <p>Agendamento</p>
                                    <span></span>
                                </button>
                            }     
                        </div>              
                        {navegacao === 0 && <AboutProfessional professional={props.professional}/>}
                        {navegacao === 1 && <ReviewsProfessional professional={props.professional}/>}
                        {navegacao === 2 && <AgendamentoProfessional professional={props.professional}/>}
                    </div>
                </div>
            </div>
        </>
    )
}