import { FaPencilAlt } from "react-icons/fa";
import './styles/perfil.scss';

export default function Perfil(){
    return (
        <div className="perfil">
            <div className="perfil-cabecalho">
                <h1>
                    Meu Perfil
                </h1>
                <button>
                    <FaPencilAlt/>
                    Alterar Dados
                </button>
            </div>
            <div className="perfil-box">
                <div className="perfil-foto">
                    <img src="/user.png" alt="" />
                    <h2>
                        John Doe
                    </h2>
                    <p>
                        Senior Developer
                    </p>
                </div>
                <div className="perfil-info">
                    <div>
                        <p>
                            Nome: 
                        </p>
                        <strong>
                            Guilherme
                        </strong>
                    </div>
                    <div>
                        <p>
                            E-mail: 
                        </p>
                        <strong>
                            email@gmail.com
                        </strong>
                    </div>
                    <div>
                        <p>
                            Celular: 
                        </p>
                        <strong>
                            +55 11 11111-1111
                        </strong>
                    </div>
                </div>
                <div className="perfil-info">
                    <div>
                        <p>
                            Usuário: 
                        </p>
                        <strong>
                            username
                        </strong>
                    </div>
                    <div>
                        <p>
                            Aniversário: 
                        </p>
                        <strong>
                            11/03/2001
                        </strong>
                    </div>
                    <div>
                        <p>
                            Confirmação de e-mail: 
                        </p>
                        <strong>
                            <img src="/check.png" alt="" />
                        </strong>
                    </div>
                </div>
                <div className="perfil-info">
                    <div>
                        <p>
                            Sexo: 
                        </p>
                        <strong>
                            masculino
                        </strong>
                    </div>
                    <div>
                        <p>
                            Interesses: 
                        </p>
                        <strong>
                            Jogos, Artes
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}