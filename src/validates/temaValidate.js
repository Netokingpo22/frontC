import { useForm, useField } from 'vee-validate'

const temaValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombre no puede estar vacío.'
            },
            actividadEnseñanza(value) {
                if (value?.length >= 1) return true
                return 'La actividad de enseñanza no puede estar vacía.'
            },
            actividadAprendizaje(value) {
                if (value?.length >= 1) return true
                return 'La actividad de aprendizaje no puede estar vacía.'
            },
            horasTeoria(value) {
                if (!isNaN(value) && value >= 0) return true
                return 'Las horas de teoría deben ser un número mayor o igual a 0.'
            },
            horasPractica(value) {
                if (!isNaN(value) && value >= 0) return true
                return 'Las horas de práctica deben ser un número mayor o igual a 0.'
            },
            competenciaGenerica(value) {
                if (value?.length >= 1) return true
                return 'La competencia genérica no puede estar vacía.'
            },
            portafolioEvidencia(value) {
                if (value?.length >= 1) return true
                return 'El portafolio de evidencia no puede estar vacío.'
            },
            instrumentoEvaluacion(value) {
                if (value?.length >= 1) return true
                return 'El instrumento de evaluación no puede estar vacío.'
            },
            competencia(value) {
                return true
            },
        },
    })
    const nombre = useField('nombre')
    const actividadEnseñanza = useField('actividadEnseñanza')
    const actividadAprendizaje = useField('actividadAprendizaje')
    const horasTeoria = useField('horasTeoria')
    const horasPractica = useField('horasPractica')
    const competenciaGenerica = useField('competenciaGenerica')
    const portafolioEvidencia = useField('portafolioEvidencia')
    const instrumentoEvaluacion = useField('instrumentoEvaluacion')
    const competencia = useField('competencia')

    const reset = () => {
        nombre.resetField();
        actividadEnseñanza.resetField();
        actividadAprendizaje.resetField();
        horasTeoria.resetField();
        horasPractica.resetField();
        competenciaGenerica.resetField();
        portafolioEvidencia.resetField();
        instrumentoEvaluacion.resetField();
        competencia.resetField();
    }
    return {
        nombre,
        actividadEnseñanza,
        actividadAprendizaje,
        horasTeoria,
        horasPractica,
        competenciaGenerica,
        portafolioEvidencia,
        instrumentoEvaluacion,
        competencia,
        handleSubmit,
        reset
    };
}

export default temaValidate
