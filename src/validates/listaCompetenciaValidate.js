import { useForm, useField } from 'vee-validate'

const listaCompetenciaValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            tipoCompetencia(value) {
                if (value) return true
                return 'El tipo de competencia no puede estar vacío.'
            },
            materia(value) {
                return true
            },
        },
    })
    const tipoCompetencia = useField('tipoCompetencia')
    const materia = useField('materia')
    const reset = () => {
        tipoCompetencia.resetField();
        materia.resetField();
    }
    return {
        tipoCompetencia,
        materia,
        handleSubmit,
        reset
    };
}

export default listaCompetenciaValidate
