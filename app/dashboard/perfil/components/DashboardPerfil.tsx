'use client';

import AlterPerfil from './AlterPerfil';
import AgendamentosPerfil from './AgendamentosPerfil';
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useState, useEffect, useMemo } from 'react';
import getInfoProfile from '../functions/getInfoProfile';
import { ProfileInfo } from '../interfaces';
import '../styles/dashboard-perfil.scss';

export default function DashboardPerfil(props: {authToken: string | undefined}) {
    const [navigation, setNavigation] = useState<Number>(1);
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

    useEffect(() => {
        const extractProfileInfoFunction = async () => {
            const profileInfo: ProfileInfo = await getInfoProfile();
            setProfileInfo(profileInfo);
        };
        extractProfileInfoFunction();
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
                        Minhas Consultas
                    </button>
                    :
                    <button onClick={() => setNavigation(1)}>
                        <FaCalendarAlt/>
                        Minhas Consultas
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
                {navigation === 0 && !profileInfo && <span className='loader-dashboard'></span>}
                {navigation === 0 && profileInfo && <AlterPerfil profileInfo={profileInfo}/>}

                {navigation === 1 && profileInfo && <AgendamentosPerfil/>}
            </div>
        </div>
    )

}