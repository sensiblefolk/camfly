import React from 'react';
import { Helmet } from 'react-helmet';

import { Campaign } from '../../../components/Views/Campaign';

const CampaignPage = () => {
  return (
    <div>
      <Helmet title='Campaign' />
      <Campaign />
    </div>
  );
};

export default CampaignPage;
