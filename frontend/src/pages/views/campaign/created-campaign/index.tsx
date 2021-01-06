import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { CreatedCampaign } from '../../../../components/Views/Campaign/CreatedCampaign';

const CampaignPage = () => {
    const params: any = useParams();

    return (
        <div>
            <Helmet title="created campaign" />
            <CreatedCampaign id={params.id}  />
        </div>
    );
};

export default CampaignPage;
