import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import * as Yup from 'yup';
import ResetModal from './ResetModal';


const { Title } = Typography;

const ResetUser = () => {
    const [regEmail, setRegEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    function emailHandler(e) {
        setRegEmail(e.target.value);
    }
    console.log("REGISTERED__EMAIL====>>>>" + regEmail);

    return (
        <div>
            <ResetModal setShowAlert={setShowAlert} showAlert={showAlert} />
            <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        let dataToSubmit = {
                            email: values.email,
                        };
                    }, 500);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <div className="app">
                            <Title level={2}>Password Reset</Title>
                            <Title style={{ fontSize: '8px' }}>
                                *required. For us to send you your user login and to reset your password, please enter your email address here.
                            </Title>
                            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                                <Form.Item required>
                                    <Input
                                        id="email"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter your registered email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        {...(setRegEmail(values.email))}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </Form.Item>
                
                                <Form.Item>
                                    <div>
                                        <Button htmlType="submit" className="reset-form-button" style={{ minWidth: '100%', backgroundColor: '#BD0A28', color: 'white' }} disabled={isSubmitting} onSubmit={handleSubmit} onClick={() => setShowAlert(true)}>
                                            Reset
                                        </Button>
                                    </div>
                                </Form.Item>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    )
}

export default ResetUser

