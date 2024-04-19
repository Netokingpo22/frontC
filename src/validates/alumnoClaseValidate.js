import { useForm, useField } from 'vee-validate'

const alumnoClaseValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            alumno(value) {
                if (value) return true
                return 'El alumno no puede estar vacío.'
            },
        },
    })
    const alumno = useField('alumno')
    const reset = () => {
        alumno.resetField();
    }
    return {
        alumno,
        handleSubmit,
        reset
    };
}

export default alumnoClaseValidate