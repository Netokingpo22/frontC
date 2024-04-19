import { useForm, useField } from 'vee-validate'

const alumnoValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            nombre(value) {
                if (value?.length >= 1) return true
                return 'El nombre no puede estar vacío.'
            },
            apellido(value) {
                if (value?.length >= 1) return true
                return 'El apellido no puede estar vacío.'
            },
            matricula(value) {
                if (value?.length >= 1) return true
                return 'La matrícula no puede estar vacía.'
            },
            genero(value) {
                if (value) return true
                return 'El género no puede estar vacío.'
            },
        },
    })
    const nombre = useField('nombre')
    const apellido = useField('apellido')
    const matricula = useField('matricula')
    const genero = useField('genero')
    const reset = () => {
        nombre.resetField();
        apellido.resetField();
        matricula.resetField();
        genero.resetField();
    }
    return {
        nombre,
        apellido,
        matricula,
        genero,
        handleSubmit,
        reset
    };
}

export default alumnoValidate
