import Link from 'next/link';
import {MainHomePropsInterface} from '../interfaces';
import Questions from './Questions';
import '../styles/main.scss';

export default function Main(props: MainHomePropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;

    return (
        <>
            <main className='container'>
                <div className='home'>
                    <div>
                        <h1>
                            Encontre o Apoio Emocional Que Você Precisa
                        </h1>
                        <p>
                        Conectamos você a terapeutas e psicólogos qualificados para oferecer suporte 
                        personalizado em sua jornada de bem-estar mental. Agende consultas online ou 
                        presenciais de forma simples e segura. Seu equilíbrio emocional começa aqui!
                        </p>
                        <Link href=''>Acessar Agora</Link>
                    </div>
                    <img src="/imagem-home.png" alt="" />
                </div>

                <div className="metricas">
                    <div className="metrica">
                        <img src="/cuidar-mente.png" alt="" />
                        <p>
                            Cuide da sua mente, encontre seu terapeuta.
                        </p>
                    </div>

                    <div className="metrica">
                        <img src="/clique.png" alt="" />
                        <p>
                            Seu bem-estar começa com um clique.
                        </p>
                    </div>

                    <div className="metrica">
                        <img src="/terapia-acessivel.png" alt="" />
                        <p>
                            Terapia acessível e personalizada para você.
                        </p>
                    </div>
                </div>

                <div className="bio">
                    <img src="bio-imagem.png" alt=""/>
                    <div>
                        <h2>
                            Nossa Jornada para o Seu Bem-Estar
                        </h2>
                        <p>
                        Bem-vindo, aqui você vai encontrar um espaço dedicado ao seu equilíbrio emocional e desenvolvimento pessoal. Criamos esta 
                        plataforma com um propósito claro: conectar você a psicólogos e terapeutas qualificados, de forma acessível, segura e prática.
                        Sabemos que a saúde mental é fundamental para uma vida plena, mas muitas vezes encontrar o profissional certo pode ser um 
                        desafio. Aqui, facilitamos esse processo, permitindo que você encontre especialistas de diversas abordagens e escolha a melhor 
                        opção para suas necessidades. Seja para lidar com ansiedade, estresse, autoestima, relacionamentos ou qualquer outro aspecto 
                        emocional, estamos aqui para ajudar. Nosso compromisso é oferecer um ambiente acolhedor, onde você pode agendar consultas 
                        online ou presenciais com facilidade e confiança. Acreditamos que todos merecem um espaço de escuta e apoio. Por isso, 
                        estamos sempre inovando para tornar a terapia mais acessível e eficaz para você. Dê o primeiro passo para uma vida mais 
                        equilibrada e descubra como a terapia pode transformar o seu dia a dia!
                        </p>
                        <Link href=''>Acessar Agora</Link>
                    </div>
                </div>

                <div className="servicos">
                    <h2>
                        Quais os benefícios?
                    </h2>
                    <div>
                        <div className="servico">
                            <img src="/terapeuta.png" alt=""/>
                            <h3>
                            Encontre o Terapeuta Ideal
                            </h3>
                            <p>
                            Conecte-se a profissionais qualificados de diversas especialidades e encontre o suporte perfeito para você.
                            </p>
                        </div>
                        <div className="servico">
                            <img src="/online-presencial.png" alt=""/>
                            <h3>
                            Terapia Online e Presencial
                            </h3>
                            <p>
                            Escolha entre sessões virtuais ou presenciais, garantindo flexibilidade e conforto no seu atendimento.
                            </p>
                        </div>
                        <div className="servico">
                            <img src="/segurança.png" alt=""/>
                            <h3>
                            Plataforma Segura e Confiável
                            </h3>
                            <p>
                            Seu bem-estar é prioridade! Aqui, você agenda consultas com total privacidade e segurança.
                            </p>
                        </div>
                        <div className="servico">
                            <img src="/acessivel.png" alt=""/>
                            <h3>
                            Acessível e Descomplicado
                            </h3>
                            <p>
                            Agende sua sessão de forma rápida e fácil, sem burocracia e com preços acessíveis.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="instrucoes">
                    <h2>
                        Como marcar uma consulta?
                    </h2>
                    <div>
                        <div className="instrucao">
                            <img src="/terapeuta.png" alt=""/>
                            <p>
                                1. Escolha um Especialista
                            </p>
                        </div>
                        <div className="instrucao">
                            <img src="/calendario.png" alt=""/>
                            <p>
                                2. Selecione a Data e Horário
                            </p>
                        </div>
                        <div className="instrucao">
                            <img src="/check.png" alt=""/>
                            <p>
                                3. Confirme a Consulta
                            </p>
                        </div>
                        <div className="instrucao">
                            <img src="/realizar-consulta.png" alt=""/>
                            <p>
                                4. Realize Sua Sessão
                            </p>
                        </div>
                    </div>
                </div>

                <div className="passos">
                    <img src="/passos-terapia.png" alt=""/>
                    <div>
                        <h2>
                        Cuide da Sua Mente: Passos Para uma Vida Equilibrada
                        </h2>
                        <p>
                        Manter uma mente saudável é essencial para o bem-estar e a qualidade de vida. Pequenas ações 
                        diárias fazem toda a diferença na forma como lidamos com desafios, emoções e relacionamentos. 
                        Confira cinco passos simples para fortalecer sua saúde mental e viver com mais equilíbrio e 
                        felicidade.
                        </p>
                        <p>
                            <img src="check.png" alt=""/>
                            Reserve momentos para relaxar, dormir bem e se alimentar de forma equilibrada. Cuidar do corpo é essencial para a mente.
                        </p>
                        <p>
                            <img src="check.png" alt=""/>
                            Use técnicas como respiração profunda, meditação ou atividades prazerosas para reduzir a ansiedade do dia a dia.
                        </p>
                        <p>
                            <img src="check.png" alt=""/>
                            Relacionamentos saudáveis fortalecem a mente. Cultive amizades e converse com pessoas que te apoiam.
                        </p>
                        <p>
                            <img src="check.png" alt=""/>
                            Reflita sobre suas emoções, pratique a gratidão e busque entender seus sentimentos para lidar melhor com eles.
                        </p>
                        <p>
                            <img src="check.png" alt=""/>
                            A terapia é uma ferramenta poderosa para fortalecer sua saúde mental. Não hesite em procurar um profissional.
                        </p>
                    </div>
                </div>

                <Questions/>

                <div className="banner">
                    <img src="/setor1.png" alt=""/>
                    <div>
                        <h2>
                            Quero melhorar a minha saúde mental
                        </h2>
                        <Link href=''>Acessar Agora</Link>
                    </div>
                    <img src="/setor2.png" alt=""/>
                </div>
          
            </main>
        </>
    )
}