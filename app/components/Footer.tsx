import Link from 'next/link';
import {FooterHomePropsInterface} from '../interfaces';
import '../styles/footer.scss';
import FooterNav from './FooterNav';

export default function Footer(props: FooterHomePropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;

    return (
        <>
            <footer className="rodape">
                <div>
                    <div className="rodape-coluna">
                        <Link href='' className="logo-rodape">
                        <img src="/logo.png" alt=""/>
                        </Link>
                    </div>
                    <FooterNav/>
                    <div className="rodape-coluna coluna-contato">
                        <h2>
                            Informações para contato
                        </h2>
                        <a href="https://api.whatsapp.com/send?phone={{contatos.whatsapp|formata_numero}}&text=Ol%C3%A1,%20vim%20do%20Site%20contasking.com.%20Como%20funciona?">
                            <p>
                                <img src="/whatsapp.png" alt="" />
                                <strong>Whatsapp:</strong> 81 99999-9999
                            </p>
                            <span></span>
                        </a>
                        <a href="">
                            <p>
                                <img src="/e-mail.png" alt="" />
                                <strong>E-mail:</strong> email@gmail.com
                            </p>
                            <span></span>
                        </a>
                        <a href="">
                            <p>
                                <img src="/suporte.png" alt="" />
                                <strong>Suporte:</strong> Seg - Sáb 09 am - 10 pm
                            </p>
                            <span></span>
                        </a>
                    </div>
                    <div className="rodape-coluna imagens-rodape">
                        <img src="/mercadopago.png" alt=""/>
                        <img src="/site_seguro.png" alt=""/>
                    </div>
                </div>
                <span></span>
                <div>
                    <strong>
                        Copyright © 2025 - Todos os Direitos Reservados
                    </strong>
                </div>
            </footer>
        </>
    )
}