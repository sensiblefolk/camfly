import React from 'react';
import { Helmet } from 'react-helmet';
import Login from '../../../components/Auth/Login';

const LoginPage = () => {
    return (
        <div>
            <Helmet title="Login" />
            <Login />
        </div>
    );
};

export default LoginPage;
