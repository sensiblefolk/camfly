import React from 'react';
import { Helmet } from 'react-helmet';
import { Success } from '../../../components/Auth/Success'

const SuccessPage = () => {
  return (
    <div>
      <Helmet title="Registration Successful" />
      <Success />
    </div>
  )
}

export default SuccessPage;