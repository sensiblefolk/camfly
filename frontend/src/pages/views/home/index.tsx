import React from 'react';
import { Helmet } from 'react-helmet';

import { Home } from '../../../components/Views/Home';

const HomePage = () => {
  return (
    <div>
      <Helmet title='Home' />
      <Home />
    </div>
  );
};

export default HomePage;
