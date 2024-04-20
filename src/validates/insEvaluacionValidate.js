import { useForm, useField } from 'vee-validate'

const insEvaluacionValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío.'
            },
            URL(value) {
                if (value?.length >= 1) return true
                return 'El URL no puede estar vacío.'
            },
        },
    })
    const nombre = useField('nombre')
    const URL = useField('URL')
    const reset = () => {
        nombre.resetField();
        URL.resetField();
    }
    return {
        nombre, 
        URL,
        handleSubmit,
        reset
    };
}

export default insEvaluacionValidate