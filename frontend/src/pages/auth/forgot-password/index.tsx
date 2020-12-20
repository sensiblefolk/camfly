import React from 'react';
import { Helmet } from 'react-helmet';
import ForgotPassword from '../../../components/Auth/ForgotPassword';

const ForgotPasswordPage = () => {
    return (
        <div>
            <Helmet title="Forgot Password" />
            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;
