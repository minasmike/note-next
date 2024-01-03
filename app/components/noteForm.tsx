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

type noteFormProps = {
    onSubmit: (values: FormValues) => void;
    initialValues: FormValues;
    validationSchema: yup.ObjectSchema<Partial<FormValues>>;
    submitButtonText: string;


};

type FormValues = {
    title: string;
    body: string;
};

const NoteForm: React.FC<noteFormProps> = ({
    onSubmit,
    initialValues,
    validationSchema,
    submitButtonText
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-8">
                <div>
                    <TextField
                        id="title"
                        size="medium"
                        className="w-full"
                        label="title"
                        variant="outlined"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </div>
                <div>
                    <TextField
                        id="body"
                        size="medium"
                        className="w-full"
                        label="body"
                        fullWidth
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        multiline
                        rows={20}
                        error={formik.touched.body && Boolean(formik.errors.body)}
                        helperText={formik.touched.body && formik.errors.body}
                    />
                </div>
            </div>
            <div className="flex justify-end pt-12">
                <SubmitButton text={submitButtonText} disabled={!formik.isValid || formik.isSubmitting} />
            </div>
            
        </form>
    );
};

export default NoteForm;