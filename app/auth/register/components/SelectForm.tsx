"use client";

import {RegisterFormValues, InputFormRegister, SelectFormInterface} from '../interfaces';
import {OptionType, Errors} from '../../interfaces';
import '@auth/styles/select.scss';
import ErrorAuth from '../../components/ErrorAuth';

export default function SelectForm(props: SelectFormInterface){
    const errors: Errors[] = props.errors;
    const formInputs: RegisterFormValues = props.formInputs;
    const setFormInputs: Function = props.setFormInputs;
    const ages: string[] | null = props.ages;
    const multiple: boolean = props.name === 'interests' ? true : false;

    const handleInputFormRegister = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, type: string) => {
        if(type === 'age'){
            setFormInputs({...formInputs, age: e.target.value});
        }
    }

    return (
        <>
            <select 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputFormRegister(e, props.name)}
                value={props.value} 
                multiple={multiple} name={props.name}>
                <option value="" disabled>{props.placeholder}</option>
                {ages?.map((age) => {
                    return (
                        <option key={age} value={age}>{age}</option>
                    )
                })};
                    
            </select>
            <ErrorAuth errors={errors} type={props.name}/>
        </>
    )
}