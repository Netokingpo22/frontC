import { useForm, useField } from 'vee-validate'

const materiaValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            carerra() {
                return true
            },
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío.'
            },
            clave(value) {
                if (value?.length >= 1) return true
                return 'La clave no puede estar vacío.'
            },
            creditosTeoricos(value) {
                if (value?.length >= 1) return true
                return 'Los creditos teoricos no pueden estar vacío.'
            },
            creditosPracticos(value) {
                if (value?.length >= 1) return true
                return 'Los creditos practicos no pueden estar vacío.'
            },
            maestro(value) {
                if (value) return true
                return 'El maestro no puede esatr vacío'
            },
            competenciaGeneral(value) {
                if (value?.length >= 1) return true
                return 'La competencia general general no puede estar vacío.'
            },
            intencionDidactica(value) {
                if (value) return true
                return 'La intencion didactica no puede esatr vacía'
            },
            caracterizacion(value) {
                if (value?.length >= 1) return true
                return 'La caracterizacion no puede estar vacía.'
            },
            tipoMateria(value) {
                if (value) return true
                return 'El tipo Materia no puede estar vacío.'
            },
            semestre(value) {
                if (value?.length >= 1) return true
                return 'El semestre no puede estar vacío.'
            },
        },
    })
    const carerra = useField('carerra')
    const nombre = useField('nombre')
    const clave = useField('clave')
    const creditosTeoricos = useField('creditosTeoricos')
    const creditosPracticos = useField('creditosPracticos')
    const maestro = useField('maestro')
    const competenciaGeneral = useField('competenciaGeneral')
    const intencionDidactica = useField('intencionDidactica')
    const caracterizacion = useField('caracterizacion')
    const tipoMateria = useField('tipoMateria')
    const semestre = useField('semestre')
    const reset = () => {
        carerra.resetField();
        nombre.resetField();
        clave.resetField();
        creditosTeoricos.resetField();
        creditosPracticos.resetField();
        maestro.resetField();
        competenciaGeneral.resetField();
        intencionDidactica.resetField();
        caracterizacion.resetField();
        tipoMateria.resetField();
        semestre.resetField();
    }
    return {
        carerra,
        nombre,
        clave,
        creditosTeoricos,
        creditosPracticos,
        maestro,
        competenciaGeneral,
        intencionDidactica,
        caracterizacion,
        tipoMateria,
        semestre,
        handleSubmit,
        reset
    };
}

export default materiaValidate
