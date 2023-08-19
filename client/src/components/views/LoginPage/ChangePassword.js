import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import * as Yup from 'yup';

const { Title } = Typography;

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log("newPassword= " + newPassword);
    console.log("ConfirmPassword= " + confirmPassword);
    return (
        <div>
            <Formik
                initialValues={{
                    newPassword: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    newPassword: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('New Password is required'),
                    confirmPassword: Yup.string()
                        .required('Confirm Password is required')
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords does not match'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        let dataToSubmit = {
                            newPassword: values.password,
                            confirmPassword: values.password
                        };

                        setSubmitting(false);
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
                            <Title level={2}>Change Password</Title>

                            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                                <Form.Item required>
                                    <Input
                                        id="newPassword"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter new password"
                                        type="password"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        {...(setNewPassword(values.newPassword))}
                                        className={
                                            errors.newPassword && touched.newPassword ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.newPassword && touched.newPassword && (
                                        <div className="input-feedback">{errors.newPassword}</div>
                                    )}
                                </Form.Item>
                                <Form.Item required>
                                    <Input
                                        id="confirmPassword"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Confirm password"
                                        type="password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        {...(setConfirmPassword(values.confirmPassword))}
                                        className={
                                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="input-feedback">{errors.confirmPassword}</div>
                                    )}
                                </Form.Item>
                                
                                <Form.Item>
                                    <div>
                                        <Button htmlType="submit" className="reset-form-button" style={{ minWidth: '100%', backgroundColor: '#BD0A28', color: 'white' }} disabled={isSubmitting} onSubmit={handleSubmit} >
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

export default ChangePassword
