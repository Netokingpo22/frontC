import { useForm, useField } from 'vee-validate'

const claseValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            grupo(value) {
                if (value?.length >= 1) return true
                return 'El grupo no puede estar vacío.'
            },
            maestro(value) {
                if (value?.length >= 1) return true
                return 'El maestro no puede estar vacío.'
            },
            aula(value) {
                if (value?.length >= 1) return true
                return 'La aula no puede estar vacía.'
            },
        },
    })
    const grupo = useField('grupo')
    const maestro = useField('maestro')
    const aula = useField('aula')
    const reset = () => {
        grupo.resetField();
        maestro.resetField();
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
