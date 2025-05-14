"use client";

import {ProfessionalsPagePropsInterface, ControlProfessionals} from '../interfaces';
import FilterProfessionals from './FilterProfessionals';
import '../styles/professionals.scss';
import Link from 'next/link';
import { FormEvent, useState, useRef, useMemo, useEffect } from 'react';
import Pagination from './Pagination';
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

export default function ProfessionalsPage(props: ProfessionalsPagePropsInterface){
    const userIsAuthenticated = props.userIsAuthenticated;

    const [control, setControl] = useState<ControlProfessionals>({
        professionalAny: [],
        pageSelected: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 5
    });
    const [viewFiltroPaginaDropBox, setViewFiltroPaginaDropBox] = useState<boolean>(false);
    const handleFiltroPaginaDropBox = () => {
        if(viewFiltroPaginaDropBox) {
            setViewFiltroPaginaDropBox(false);
        } else {
            setViewFiltroPaginaDropBox(true);
        }
    }

    return (
        <>
            <div className='container-professionals'>
                <div>
                    <h1>
                        Encontre o seu psicólogo/terapeuta
                    </h1>

                    <FilterProfessionals control={control} setControl={setControl}/>

                    <div className='filtros-adicionais'>
                        <h2>
                            {
                                control.totalElements === 1
                                ?
                                ` Foi encontrado 1 profissional`
                                :
                                ` Foram encontrados ${control.totalElements} profissionais`
                            }
                            :
                        </h2>
                        <div className='filtro-pagina'>
                            <p onClick={() => handleFiltroPaginaDropBox()}>
                                Quantidade por página: {control.pageSize} 
                                {
                                    !viewFiltroPaginaDropBox
                                    ?
                                    <GoChevronDown/>
                                    :
                                    <GoChevronUp/>
                                }
                            </p>
                            {
                                viewFiltroPaginaDropBox
                                &&
                                <div className='filtro-pagina-dropbox'>
                                    <p onClick={() => setControl({...control, pageSize: 5, pageSelected: 0})} 
                                    className={`${control.pageSize === 5 ? 'selected' : ''}`}>
                                        5
                                    </p>
                                    <p onClick={() => setControl({...control, pageSize: 10, pageSelected: 0})} 
                                    className={`${control.pageSize === 10 ? 'selected' : ''}`}>
                                        10
                                    </p>
                                    <p onClick={() => setControl({...control, pageSize: 15, pageSelected: 0})} 
                                    className={`${control.pageSize === 15 ? 'selected' : ''}`}>
                                        15
                                    </p>
                                    <p onClick={() => setControl({...control, pageSize: 20, pageSelected: 0})} 
                                    className={`${control.pageSize === 20 ? 'selected' : ''}`}>
                                        20
                                    </p>
                                    <p onClick={() => setControl({...control, pageSize: 25, pageSelected: 0})} 
                                    className={`${control.pageSize === 25 ? 'selected' : ''}`}>
                                        25
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='professionals'>
                        {control.professionalAny.map(professional => {
                            return (
                                <div className='professional' key={professional.professionalInfo.uuid}>
                                    <div className='photo'>
                                        {
                                            professional.professionalInfo.linkPhoto
                                            ?
                                            <img src={professional.professionalInfo.linkPhoto} alt="" />
                                            :
                                            <img src="/user.png" alt="" />
                                        }
                                    </div>
                                    <div className='bio-breve'>
                                        <h3>
                                            {professional.professionalInfo.gender === 'MULHER' ? 'Dra. ' : 'Dr. '}  {professional.professionalInfo.name}
                                        </h3>
                                        <p>
                                            Psicóloga Clínica. 
                                        </p>
                                        <p>
                                            <strong>CRP: </strong>{professional.professionalInfo.crp}
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
                                            {professional.professionalInfo.description}
                                        </p>
                                        <div className='categorias'>
                                            {professional.professionalInfo.interests.map(interest => {
                                                return (
                                                    <span key={interest.label}>{interest.label}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='info'>
                                        <p><strong>R$ {professional.configAgendamentoDTO?.price 
                                        ? `${professional.configAgendamentoDTO?.price}`.replace('.', ',') : '00,00'}</strong> / sessão</p>
                                        <p>
                                            <strong>Duração: </strong> 
                                            {professional.configAgendamentoDTO?.duration 
                                            ? professional.configAgendamentoDTO?.duration : 0} minutos
                                        </p>
                                        <p>
                                            <img src="/check-2.png" alt="" />
                                            Próxima disponibilidade: Hoje
                                        </p>
                                        <div>
                                            <Link href=''>Agendar consulta</Link>
                                            <Link href={`/profissionais/${professional.professionalInfo.uuid}`}>Ver perfil completo</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    {   
                        control.totalElements > control.pageSize
                        &&
                        <Pagination control={control} setControl={setControl}/>
                    }
                </div>
            </div>
        </>
    )
}