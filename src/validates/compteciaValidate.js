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
            listaCompetencia(value) {
                return true
            },
        },
    })
    const nombre = useField('nombre')
    const nivel = useField('nivel')
    const resumen = useField('resumen')
    const listaCompetencia = useField('listaCompetencia')
    const reset = () => {
        nombre.resetField();
        nivel.resetField();
        resumen.resetField();
        listaCompetencia.resetField();
    }
    return {
        nombre,
        nivel,
        resumen, 
        listaCompetencia,
        handleSubmit,
        reset
    };
}

export default competenciaValidate
