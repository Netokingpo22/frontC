import { useForm, useField } from 'vee-validate'

const carreraValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío. '
            },
            siglas(value) {
                if (value?.length >= 1) return true
                return 'Las siglas no puede estar vacío. '
            },
        },
    })
    const nombre = useField('nombre')
    const siglas = useField('siglas')
    const reset = () => {
        nombre.resetField();
        siglas.resetField();
    }
    return {
        nombre,
        siglas,
        handleSubmit,
        reset
    };
}

export default carreraValidate