import '../styles/about-professional.scss';

export default function AboutProfessional(){
    return (
        <div className='info-bio'>
            <div className='area-description'>
                <h2>
                    Sobre a Dra. Sofia Mendes
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore, 
                    cum iste eaque eligendi accusamus consequatur. Natus eos, optio doloribus 
                    pariatur voluptatem aliquid quasi odio et ad esse tenetur autem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore, 
                    cum iste eaque eligendi accusamus consequatur. Natus eos, optio doloribus 
                    pariatur voluptatem aliquid quasi odio et ad esse tenetur autem?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore, 
                    cum iste eaque eligendi accusamus consequatur. Natus eos, optio doloribus 
                    pariatur voluptatem aliquid quasi odio et ad esse tenetur autem?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore, 
                    cum iste eaque eligendi accusamus consequatur. Natus eos, optio doloribus 
                    pariatur voluptatem aliquid quasi odio et ad esse tenetur autem?
                </p>
            </div>
            <div className='area-especialidades'>
                <h3>
                    Áreas de especialidade
                </h3>
                <div>
                    <span>Ansiedade</span>
                    <span>Depressão</span>
                    <span>Autoestima</span>
                    <span>Estresse</span>
                    <span>Psicanálise</span>
                </div>
            </div>

            <div className='abordagens'>
                <h3>
                    Abordagens terapêuticas
                </h3>
                <div>
                    <span>Ansiedade</span>
                    <span>Depressão</span>
                    <span>Autoestima</span>
                    <span>Estresse</span>
                    <span>Psicanálise</span>
                </div>
            </div>

            <div className='formacao-academica'>
                <h3>
                    Formação acadêmica
                </h3>
                <div className='formacoes'>
                    <div className='formacao'>
                        <img src="/formacao.png" alt="" />
                        <div>
                            <strong>Graduação em tecnologia</strong>
                            <p>
                                Universidade de São Paulo - USP (2015)
                            </p>
                        </div>
                    </div>
                    <div className='formacao'>
                        <img src="/formacao.png" alt="" />
                        <div>
                            <strong>Graduação em tecnologia</strong>
                            <p>
                                Universidade de São Paulo - USP (2015)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='formacao-idiomas'>
                <h3>
                    Idiomas
                </h3>
                <div className='idiomas'>
                    <div className='idioma'>
                        <img src="/translate.png" alt="" />
                        <p>
                            Português (Nativo)
                        </p>
                    </div>
                    <div className='idioma'>
                        <img src="/translate.png" alt="" />
                        <p>
                            Inglês (Fluente)
                        </p>
                    </div>
                    <div className='idioma'>
                        <img src="/translate.png" alt="" />
                        <p>
                            Espanhol (Intermediário)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}