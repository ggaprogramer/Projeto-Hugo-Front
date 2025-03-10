"use client";

import '../styles/agendamentos-professional.scss';
import { Calendar } from 'primereact/calendar';
import {useRef, useState, useEffect} from 'react';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { locale, addLocale } from 'primereact/api';
import { Nullable } from "primereact/ts-helpers";

addLocale('pt-BR', {
    firstDayOfWeek: 0,
    dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'Hoje',
    clear: 'Limpar',
});

export default function AgendamentoProfessional(){
    const [date, setDate] = useState<Nullable<Date>>(null);

    useEffect(() => {
        locale('pt-BR');
    }, []);



    return (
        <div className='info-agendamentos'>
            <h2>
                Agende sua consulta
            </h2>
            <p>
                Selecione o dia e horário de sua preferência para agendar sua consulta com a Dra. Sofia Mendes.
            </p>
            <div className="card flex justify-content-center" style={{border: '1px solid black', width: '100%'}}>
                <Calendar dateFormat="dd/mm/yy" locale='pt-BR' value={date} onChange={(e) => setDate(e.value)} inline className="custom-calendar" />
            </div>
        </div>
    )
}