import React from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Buttoncomponent from './button';

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
        <form onSubmit={formik.handleSubmit} className=''>
            <div className="space-y-8">
                <div>
                    <TextField
                        id="title"
                        size="medium"
                        className="w-full bg-gray-100"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </div>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={formik.values.body}
                        onChange={(value) => formik.setFieldValue('body', value)}
                        style={{ height: "620px" }} className='bg-gray-100 large-editor pb-10'
                    />
                    {formik.touched.body && formik.errors.body && (
                        <span className="text-red-500">{formik.errors.body}</span>
                    )}
                </div>
                <div className="flex justify-end">
                    <Buttoncomponent
                        text={submitButtonText}
                        disabled={!formik.isValid || formik.isSubmitting}
                        onClickAction={formik.handleSubmit}
                        className="bg-white font-bold text-green-400 hover:bg-green-400 hover:font-extrabold hover:text-white"
                    />
                </div>
            </div>

        </form>
    );
};

export default NoteForm;
