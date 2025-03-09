import {ProfessionalsPagePropsInterface} from '../interfaces';
import Header from '@home/Header';
import Footer from '@home/Footer';
import FilterProfessionals from './FilterProfessionals';
import '../styles/professionals.scss';
import '../styles/filters-professionals.scss';
import Link from 'next/link';

export default function ProfessionalsPage(props: ProfessionalsPagePropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;

    return (
        <>
            <Header userIsAuthenticated={userIsAuthenticated}/>
            <div className='container-professionals'>
                <div>
                    <h1>
                        Encontro o seu psicólogo/terapeuta
                    </h1>

                    <FilterProfessionals/>

                    <h2>
                        Mostrando 15 profissionais:
                    </h2>
                    <div className='professionals'>
                        <div className='professional'>
                            <div className='photo'>
                                <img src="/user.png" alt="" />
                            </div>
                            <div className='bio-breve'>
                                <h3>
                                    Dra. Sofia Mendes
                                </h3>
                                <p>
                                    Psicóloga Clínica - CRP: 06/54321
                                </p>
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
                                <p className='descricao'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus non quaerat asperiores, 
                                    corporis dicta ab voluptas nemo eum quae optio quis id voluptatum quas. Fuga animi dolorem molestiae quas.
                                </p>
                                <div className='categorias'>
                                    <span>Ansiedade</span>
                                    <span>Depressão</span>
                                    <span>Autoestima</span>
                                    <span>Estresse</span>
                                    <span>Psicanálise</span>
                                </div>
                            </div>
                            <div className='info'>
                                <p><strong>R$ 180,00</strong> / sessão</p>
                                <p>
                                    <strong>Duração:</strong> 50 minutos
                                </p>
                                <p>
                                    <img src="/check-2.png" alt="" />
                                    Próxima disponibilidade: Hoje
                                </p>
                                <div>
                                    <Link href=''>Agendar consulta</Link>
                                    <Link href=''>Ver perfil completo</Link>
                                </div>
                            </div>
                        </div>
                        <div className='professional'>
                            <div className='photo'>
                                <img src="/user.png" alt="" />
                            </div>
                            <div className='bio-breve'>
                                <h3>
                                    Dra. Sofia Mendes
                                </h3>
                                <p>
                                    Psicóloga Clínica - CRP: 06/54321
                                </p>
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
                                <p className='descricao'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus non quaerat asperiores, 
                                    corporis dicta ab voluptas nemo eum quae optio quis id voluptatum quas. Fuga animi dolorem molestiae quas.
                                </p>
                                <div className='categorias'>
                                    <span>Ansiedade</span>
                                    <span>Depressão</span>
                                    <span>Autoestima</span>
                                    <span>Estresse</span>
                                    <span>Psicanálise</span>
                                </div>
                            </div>
                            <div className='info'>
                                <p><strong>R$ 180,00</strong> / sessão</p>
                                <p>
                                    <strong>Duração:</strong> 50 minutos
                                </p>
                                <p>
                                    <img src="/check-2.png" alt="" />
                                    Próxima disponibilidade: Hoje
                                </p>
                                <div>
                                    <Link href=''>Agendar consulta</Link>
                                    <Link href=''>Ver perfil completo</Link>
                                </div>
                            </div>
                        </div>
                        <div className='professional'>
                            <div className='photo'>
                                <img src="/user.png" alt="" />
                            </div>
                            <div className='bio-breve'>
                                <h3>
                                    Dra. Sofia Mendes
                                </h3>
                                <p>
                                    Psicóloga Clínica - CRP: 06/54321
                                </p>
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
                                <p className='descricao'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus non quaerat asperiores, 
                                    corporis dicta ab voluptas nemo eum quae optio quis id voluptatum quas. Fuga animi dolorem molestiae quas.
                                </p>
                                <div className='categorias'>
                                    <span>Ansiedade</span>
                                    <span>Depressão</span>
                                    <span>Autoestima</span>
                                    <span>Estresse</span>
                                    <span>Psicanálise</span>
                                </div>
                            </div>
                            <div className='info'>
                                <p><strong>R$ 180,00</strong> / sessão</p>
                                <p>
                                    <strong>Duração:</strong> 50 minutos
                                </p>
                                <p>
                                    <img src="/check-2.png" alt="" />
                                    Próxima disponibilidade: Hoje
                                </p>
                                <div>
                                    <Link href=''>Agendar consulta</Link>
                                    <Link href=''>Ver perfil completo</Link>
                                </div>
                            </div>
                        </div>
                        <div className='professional'>
                            <div className='photo'>
                                <img src="/user.png" alt="" />
                            </div>
                            <div className='bio-breve'>
                                <h3>
                                    Dra. Sofia Mendes
                                </h3>
                                <p>
                                    Psicóloga Clínica - CRP: 06/54321
                                </p>
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
                                <p className='descricao'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus non quaerat asperiores, 
                                    corporis dicta ab voluptas nemo eum quae optio quis id voluptatum quas. Fuga animi dolorem molestiae quas.
                                </p>
                                <div className='categorias'>
                                    <span>Ansiedade</span>
                                    <span>Depressão</span>
                                    <span>Autoestima</span>
                                    <span>Estresse</span>
                                    <span>Psicanálise</span>
                                </div>
                            </div>
                            <div className='info'>
                                <p><strong>R$ 180,00</strong> / sessão</p>
                                <p>
                                    <strong>Duração:</strong> 50 minutos
                                </p>
                                <p>
                                    <img src="/check-2.png" alt="" />
                                    Próxima disponibilidade: Hoje
                                </p>
                                <div>
                                    <Link href=''>Agendar consulta</Link>
                                    <Link href=''>Ver perfil completo</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='navegacao'>
                        <Link href=''>⭠</Link>
                        <Link href='' className='selected'>1</Link>
                        <Link href=''>2</Link>
                        <Link href=''>3</Link>
                        <Link href=''>4</Link>
                        <Link href=''>5</Link>
                        <Link href=''>⭢</Link>
                    </div>
                </div>
            </div>
            <Footer userIsAuthenticated={userIsAuthenticated}/>
        </>
    )
}