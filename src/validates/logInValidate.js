import { useForm, useField } from 'vee-validate'

const logInValidate = () => {
    const { handleSubmit } = useForm({
        validationSchema: {
            username(value) {
                if (value?.length >= 1) return true
                return 'El nombré no puede estar vacío. '
            },
            password(value) {
                if (value?.length >= 1) return true
                return 'La contrseña no puede estar vacío. '
            },
        },
    })
    const username = useField('username')
    const password = useField('password')

    return {
        username,
        password,
        handleSubmit
    };
}

export default logInValidate