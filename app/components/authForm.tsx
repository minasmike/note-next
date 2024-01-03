
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SubmitButton from './button';
import Link from 'next/link';
type AuthFormProps = {
    onSubmit: (values: FormValues) => void;
    initialValues: FormValues;
    validationSchema: yup.ObjectSchema<Partial<FormValues>>;
    submitButtonText: string;
    linkToPage: string;
    linkName: string;
    message: string;

};

type FormValues = {
    username: string;
    password: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
    onSubmit,
    initialValues,
    validationSchema,
    submitButtonText,
    linkToPage,
    linkName,
    message
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-8">
                <div>
                    <TextField
                        id="username"
                        size="medium"
                        className="w-full"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        size="medium"
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end pt-12">
                <SubmitButton text={submitButtonText} disabled={!formik.isValid || formik.isSubmitting} />
            </div>
            <div className='pt-8 text-xl'>
                <span className='-ml-8 text-black font-light'>{message}</span><Link href={linkToPage} className='text-blue-400 underline font-bold' >{linkName} </Link>
            </div>
        </form>
    );
};

export default AuthForm;