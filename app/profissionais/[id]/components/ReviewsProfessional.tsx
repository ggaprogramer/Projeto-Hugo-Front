import '../styles/reviews-professional.scss';
import {ProfessionalInfo, ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';

export default function ReviewsProfessional(props: {professional: ProfessionalAnyInterface}){
    const professional = props.professional?.professionalInfo;
    const configAgendamento = props.professional?.configAgendamentoDTO;
    
    return (
        <div className='info-reviews'>
            <h2>
                Avaliações e Depoimentos
            </h2>
            <div className='review-note'>
                <h3>
                    4,8
                </h3>
                <div className='notes'>
                    <div>
                        <img src="/estrela-preenchida.png" alt="" />
                        <img src="/estrela-preenchida.png" alt="" />
                        <img src="/estrela-preenchida.png" alt="" />
                        <img src="/estrela-preenchida.png" alt="" />
                        <img src="/estrela-cinza.png" alt="" />
                    </div>
                    <p>
                        128 avaliações
                    </p>
                </div>
            </div>
            <div className='reviews'>
                <div className='review'>
                    <div className='review-intern'>
                        <div>
                            <img src="/user.png" alt="" />
                            <div>
                                <h3> Maria S. </h3>
                                <p>
                                    Paciente há 6 meses
                                </p>
                            </div>
                        </div>
                        <div className='review-stars'>
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-cinza.png" alt="" />
                        </div>
                    </div>
                    <p className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sit expedita hic maiores 
                        reiciendis in sint tempora asperiores modi accusantium! Itaque minus qui praesentium sed 
                        nostrum debitis? Facilis, architecto distinctio!
                    </p>
                    <span></span>
                </div>
                <div className='review'>
                    <div className='review-intern'>
                        <div>
                            <img src="/user.png" alt="" />
                            <div>
                                <h3> Maria S. </h3>
                                <p>
                                    Paciente há 6 meses
                                </p>
                            </div>
                        </div>
                        <div className='review-stars'>
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-cinza.png" alt="" />
                        </div>
                    </div>
                    <p className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sit expedita hic maiores 
                        reiciendis in sint tempora asperiores modi accusantium! Itaque minus qui praesentium sed 
                        nostrum debitis? Facilis, architecto distinctio!
                    </p>
                    <span></span>
                </div>
                <div className='review'>
                    <div className='review-intern'>
                        <div>
                            <img src="/user.png" alt="" />
                            <div>
                                <h3> Maria S. </h3>
                                <p>
                                    Paciente há 6 meses
                                </p>
                            </div>
                        </div>
                        <div className='review-stars'>
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-preenchida.png" alt="" />
                            <img src="/estrela-cinza.png" alt="" />
                        </div>
                    </div>
                    <p className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sit expedita hic maiores 
                        reiciendis in sint tempora asperiores modi accusantium! Itaque minus qui praesentium sed 
                        nostrum debitis? Facilis, architecto distinctio!
                    </p>
                    <span></span>
                </div>
            </div>
        </div>
    )
}