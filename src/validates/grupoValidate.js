import { useForm, useField } from 'vee-validate'

const grupoValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            materia(value) {
                if (value?.length >= 1) return true
                return 'La materia no puede estar vacía.'
            },
            numero(value) {
                if (value?.length >= 1) return true
                return 'El número no puede estar vacío.'
            },
            año(value) {
                if (value?.length >= 1) return true
                return 'El año no puede estar vacío.'
            },
            semestre(value) {
                if (value?.length >= 1) return true
                return 'El semestre no puede estar vacío.'
            },
        },
    })
    const materia = useField('materia')
    const numero = useField('numero')
    const año = useField('año')
    const semestre = useField('semestre')
    const reset = () => {
        materia.resetField();
        numero.resetField();
        año.resetField();
        semestre.resetField();
    }
    return {
        materia,
        numero,
        año,
        semestre,
        handleSubmit,
        reset
    };
}

export default grupoValidate
