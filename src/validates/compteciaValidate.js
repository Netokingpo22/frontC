import { useForm, useField } from 'vee-validate'

const competenciaValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombre no puede estar vacío.'
            },
            nivel(value) {
                if (value) return true
                return 'El nivel no puede estar vacío.'
            },
            resumen(value) {
                if (value?.length >= 1) return true
                return 'El resumen no puede estar vacío.'
            },
            list(value) {
                return true
            },
        },
    })
    const nombre = useField('nombre')
    const nivel = useField('nivel')
    const resumen = useField('resumen')
    const list = useField('list')
    const reset = () => {
        nombre.resetField();
        nivel.resetField();
        resumen.resetField();
        list.resetField();
    }
    return {
        nombre,
        nivel,
        resumen, 
        list,
        handleSubmit,
        reset
    };
}

export default competenciaValidate
