import React from 'react';
import { Helmet } from 'react-helmet';
import Register from '../../../components/Auth/Register';

const RegisterPage = () => {
    return (
        <div>
            <Helmet title="Register" />
            <Register />
        </div>
    );
};

export default RegisterPage;
