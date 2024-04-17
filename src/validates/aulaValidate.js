import { useForm, useField } from 'vee-validate'

const aulaValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío.'
            },
        },
    })
    const nombre = useField('nombre')
    const reset = () => {
        nombre.resetField();
    }
    return {
        nombre,
        handleSubmit,
        reset
    };
}

export default aulaValidate