import '../styles/about-professional.scss';
import {ProfessionalInfo, ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';

export default function AboutProfessional(props: {professional: ProfessionalAnyInterface}){
    const professional = props.professional?.professionalInfo;
    const configAgendamento = props.professional?.configAgendamentoDTO;

    return (
        <div className='info-bio'>
            <div className='area-description'>
                <h2>
                    Sobre {professional.gender === 'MULHER' ? 'a Dra. ' : 'o Dr. '} {professional.name}
                </h2>
                <p>
                    {professional.description}
                </p>
            </div>
            
            <div className='area-especialidades'>
                <h3>
                    Áreas de especialidade
                </h3>
                <div>
                    {
                        professional.specialties.map(specialty => {
                            return (
                                <span key={specialty.value}>{specialty.label}</span>
                            )
                        })   
                    }
                </div>
            </div>

            <div className='area-abordagens'>
                <h3>
                    Abordagens terapêuticas
                </h3>
                <div>
                    {
                        professional.approaches.map(approach => {
                            return (
                                <span key={approach.value}>{approach.label}</span>
                            )
                        })   
                    }
                </div>
            </div>

            <div className='area-interesses'>
                <h3>
                    Áreas de interesses
                </h3>
                <div>
                    {
                        professional.interests.map(interest => {
                            return (
                                <span key={interest.value}>{interest.label}</span>
                            )
                        })   
                    }
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
                    {
                        professional.languages.map(language => {
                            return (
                                <div className='idioma' key={language.value}>
                                    <img src="/translate.png" alt="" />
                                    <p>
                                        {language.label} ({language.level})
                                    </p>
                                </div>
                            )
                        })  
                    }
                </div>
            </div>
        </div>
    )
}