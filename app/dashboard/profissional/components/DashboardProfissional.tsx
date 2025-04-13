'use client';

import AlterProfessional from './AlterProfessional';
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useState, useEffect, useMemo } from 'react';
import getInfoProfessional from '../functions/getInfoProfessional';
import { ProfessionalInfo } from '../interfaces';
import '../styles/dashboard-profissional.scss';

export default function DashboardProfissional(props: {authToken: string | undefined}) {
    const [navigation, setNavigation] = useState<Number>(0);
    const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>({
        uuid: '',
        name: '',
        username: '',
        email: '',
        interests: [],
        approaches: [],
        specialties: [],
        languages: [],
        gender: '',
        phone: '',
        dateBirth: '',
        linkPhoto: undefined,
        confirmacaoEmail: false,
        registrationCompleted: false,
    });
    
    useEffect(() => {
        const extractprofessionalInfoFunction = async () => {
            const professionalInfo: ProfessionalInfo = await getInfoProfessional();
            professionalInfo.interests = professionalInfo.interests ? professionalInfo.interests : [];
            professionalInfo.approaches = professionalInfo.approaches ? professionalInfo.approaches : [];
            professionalInfo.specialties = professionalInfo.specialties ? professionalInfo.specialties : [];
            professionalInfo.languages = professionalInfo.languages ? professionalInfo.languages : [];
            setProfessionalInfo(professionalInfo);
        };
        extractprofessionalInfoFunction();
    }, []);

    return (
        <div className='container-dashboard'>
            <div className='barra-lateral'>
                {
                    navigation === 0
                    ?
                    <button className='selected'>
                        <FaUser/>
                        Perfil
                    </button>
                    :
                    <button onClick={() => setNavigation(0)}>
                        <FaUser/>
                        Perfil
                    </button>
                }
                {
                    navigation === 1
                    ?
                    <button className='selected'>
                        <FaCalendarAlt/>
                        Meus Agendamentos
                    </button>
                    :
                    <button onClick={() => setNavigation(1)}>
                        <FaCalendarAlt/>
                        Meus Agendamentos
                    </button>
                }
                {
                    navigation === 2
                    ?
                    <button className='selected'>
                        <IoMdSettings/>
                        Configurações
                    </button>
                    :
                    <button onClick={() => setNavigation(2)}>
                        <IoMdSettings/>
                        Configurações
                    </button>
                }
            </div>
            <div className='barra-principal'>
                {
                    navigation === 0 && professionalInfo.uuid
                    ?
                    <AlterProfessional professionalInfo={professionalInfo}/>
                    :
                    <span className='loader-dashboard'></span>
                }
            </div>
        </div>
    )

}