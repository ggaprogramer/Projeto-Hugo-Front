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
    const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo | null>(null);

    useEffect(() => {
        const extractprofessionalInfoFunction = async () => {
            const professionalInfo: ProfessionalInfo = await getInfoProfessional();
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
                    navigation === 0 && professionalInfo
                    ?
                    <AlterProfessional professionalInfo={professionalInfo}/>
                    :
                    <span className='loader-dashboard'></span>
                }
            </div>
        </div>
    )

}