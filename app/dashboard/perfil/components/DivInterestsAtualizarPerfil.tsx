'use client';

import {DivInterestsAtualizarFormInterface} from '../interfaces';
import {OptionType, Errors} from '@auth/interfaces';
import {useMemo, useState, useRef} from 'react';
import ErrorAuth from '@auth/components/ErrorAuth';

export default function DivInterestsAtualizarPerfil(props: DivInterestsAtualizarFormInterface){
    const formRegister = props.formRegister;
    const formInputs = props.formInputs;
    const setFormInputs = props.setFormInputs;
    const errors: Errors[] = props.errors;

    const opcoes = useMemo<OptionType[]>(() => {
        return (
            [
                { value: 'TERAPIA', label: 'Terapia' },
                { value: 'PSICOLOGIA', label: 'Psicologia' },
                { value: 'TERAPIA_COGNITIVO_COMPORTAMENTAL', label: 'Terapia Cognitivo-Comportamental' },
                { value: 'PSICOTERAPIA', label: 'Psicoterapia' },
                { value: 'TERAPIA_EMOCIONAL', label: 'Terapia Emocional' },
                { value: 'SAUDE_MENTAL', label: 'Saúde Mental' },
                { value: 'ANSIEDADE', label: 'Ansiedade' },
                { value: 'DEPRESSAO', label: 'Depressão' },
                { value: 'RELACIONAMENTOS', label: 'Relacionamentos' },
                { value: 'AUTOESTIMA', label: 'Autoestima' },
                { value: 'MINDFULNESS', label: 'Mindfulness' },
                { value: 'ESTRESSE', label: 'Estresse' },
                { value: 'TRAUMA', label: 'Trauma' },
                { value: 'PSICANALISE', label: 'Psicanálise' },
                { value: 'ADOLESCENCIA', label: 'Adolescência' },
            ]
        )
    }, []);

    const [interestsSearch, setInterestsSearch] = useState('');
    const [interestsDropbox, setInterestsDropbox] = useState(0);
    const inputInterestsSearch = useRef<HTMLInputElement>(null);

    const handleInputInterestsEnter = () => {
        if(interestsDropbox === 0){
            setInterestsDropbox(1);
        }
    }

    const handleInputInterestsLeave = () => {
        if(interestsDropbox === 1){
            setInterestsDropbox(0);
            inputInterestsSearch.current?.blur();
        }
    }

    const handleChangeInputsInterestsAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            const checkboxes = formRegister?.current?.querySelectorAll<HTMLInputElement>('.interests-checkbox');
            let arrayValores: string[] = [];
            if(checkboxes){
                arrayValores = Array.from(checkboxes).map((checkbox) => checkbox.value.toUpperCase());
                setFormInputs({...formInputs, interests: arrayValores});
            }
        } else{
            setFormInputs({...formInputs, interests: []});
        }
    }

    const handleChangeInputsInterests = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = formRegister?.current?.querySelectorAll<HTMLInputElement>('.interests-checkbox');
        let arrayValores: string[] = [];
        if(checkboxes){
            arrayValores = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.toUpperCase());
            setFormInputs({...formInputs, interests: arrayValores});
        }
    }

    const placeholder = formInputs.typeProfile === 'PROFILE' ? 'Selecione seus interesses:' : 'Selecione seus interesses de atuação:';

    return (
        <>
            <div id='interests-box' onMouseLeave={handleInputInterestsLeave}>
                <input type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInterestsSearch(e.target.value);
                }}
                onFocus={handleInputInterestsEnter}
                name="interests-search" ref={inputInterestsSearch} id="interests-search" 
                placeholder={
                    formInputs.interests && formInputs.interests.length === 1
                    ? `1 interesse selecionado` 
                    : `${formInputs.interests.length === 0
                        ? placeholder
                        : `${formInputs.interests.length} interesses selecionados` 
                    }`
                }/>
                {interestsDropbox === 1 &&
                    <div id='interests-dropbox'>
                    {
                        interestsSearch === ''
                        &&
                        <label>
                            <input type="checkbox" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeInputsInterestsAll(e);
                            }} checked={formInputs.interests.length === opcoes.length ? true : false}/>
                            <p>
                            Selecione todas as opções
                            </p>
                        </label>
                    }
                    {opcoes.map((opcao) => {
                        if(opcao.value.toLowerCase().indexOf(interestsSearch.toLowerCase()) != -1){
                            return (
                                <label key={opcao.value.toUpperCase()}>
                                    <input type="checkbox" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChangeInputsInterests(e);
                                    }} 
                                    name='interests' 
                                    checked={formInputs.interests.indexOf(opcao.value.toUpperCase()) !== -1 ? true : false}
                                    className='interests-checkbox' value={opcao.value.toUpperCase()} />
                                    <p>
                                    {opcao.label}
                                    </p>
                                </label>
                            )
                        } 
                    })}
                </div>
                }
            </div>
            <ErrorAuth errors={errors} type='interests'/>
        </>
    )
}