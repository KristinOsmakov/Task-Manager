import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth.reducer";
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validateOnBlur: true,
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Введи пароль, Олень'
            } else if (values.password.length < 6) {
                errors.password = 'слишком короткий у тебя'
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values))
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered
                            <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                            {...formik.getFieldProps('email')}
                                   // name="email"
                                   // onBlur={formik.handleBlur}
                                   // // onChange={formik.handleChange}
                                   // value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password" margin="normal"
                                   {...formik.getFieldProps('password')}
                                   // name="password"
                                   // onBlur={formik.handleBlur}
                                   // onChange={formik.handleChange}
                                   // value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox onChange={formik.handleChange}
                                                                                   checked={formik.values.rememberMe}
                                                                                   name="rememberMe"/>} />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}