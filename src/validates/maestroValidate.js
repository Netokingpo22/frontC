import { useForm, useField } from 'vee-validate'

const maestroValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío.'
            },
            apellido(value) {
                if (value?.length >= 1) return true
                return 'El apellido no puede estar vacío.'
            },
            estudios(value) {
                if (value?.length >= 1) return true
                return 'El estudio no puede estar vacío.'
            },
            tipoEstudios(value) {
                if (value) return true
                return 'El tipo de estudio no puede estar vacío.'
            },
            fechaIngrso(value) {
                if (value?.length >= 1) return true
                return 'La fecha no puede estar vacío.'
            },
            puesto(value) {
                if (value?.length >= 1) return true
                return 'El puesto no puede estar vacío.'
            },
        },
    })
    const nombre = useField('nombre')
    const apellido = useField('apellido')
    const estudios = useField('estudios')
    const tipoEstudios = useField('tipoEstudios')
    const fechaIngrso = useField('fechaIngrso')
    const puesto = useField('puesto')
    const reset = () => {
        nombre.resetField();
        apellido.resetField();
        estudios.resetField();
        tipoEstudios.resetField();
        fechaIngrso.resetField();
        puesto.resetField();
    }
    return {
        nombre,
        apellido,
        estudios,
        tipoEstudios,
        fechaIngrso,
        puesto,
        handleSubmit,
        reset
    };
}

export default maestroValidate