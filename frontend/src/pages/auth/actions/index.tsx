import React from 'react';
import { Helmet } from 'react-helmet';
import Actions from '../../../components/Auth/Actions';

// TODO add sorting for email verification and password reset actions

const ActionsPage = () => {
    return (
        <div>
            <Helmet title="Password Reset" />
            <Actions />
        </div>
    );
};

export default ActionsPage;
