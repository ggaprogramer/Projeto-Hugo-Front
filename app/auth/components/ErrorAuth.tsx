import {ErrorsComponents} from '../interfaces';

export default function ErrorAuth(props: ErrorsComponents) {
    const errors = props.errors;
    const type = props.type;
    return (
        type === 'lenErrors'
        ?
        errors.map((error) => {
            if(error.type === 'lenErrors'){
                return (
                    <small key={error.description} className='error-text-center'>Revise o Formulário - {error.description} Erro(s)</small>
                )
            }
        })
        :
        errors.map((error) => {
            if(error.type === type){
                return (<small key={error.description} className='error'>{error.description}</small>)
            }
        })
    )
}