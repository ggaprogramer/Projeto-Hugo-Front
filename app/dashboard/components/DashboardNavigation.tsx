'use client';

import { ProfileInfo } from '../perfil/interfaces';
import React, { Suspense } from 'react';
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {useState} from 'react';

export default function DashboardNavigation(props: {children: Readonly<React.ReactNode>}) {
    const children = props.children;
    const [navigation, setNavigation] = useState<Number>(0);

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
            <div className='barra-principal'>{children}</div>
        </div>
    )

}