import { useForm, useField } from 'vee-validate'

const claseValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            grupo(value) {
                return true
            },
            maestro(value) {
                return true
            },
            aula(value) {
                return true
            },
        },
    })
    const grupo = useField('grupo')
    const maestro = useField('maestro')
    const aula = useField('aula')
    const reset = () => {
        aula.resetField();
    }
    return {
        grupo,
        maestro,
        aula,
        handleSubmit,
        reset
    };
}

export default claseValidate
