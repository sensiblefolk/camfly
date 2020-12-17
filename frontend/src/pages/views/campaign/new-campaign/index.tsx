import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { NewCampaign } from '../../../../components/Views/Campaign/NewCampaign';

const CampaignPage = () => {
    const params: any = useParams();

    return (
        <div>
            <Helmet title={params?.title} />
            <NewCampaign id={params.id} title={params.title} />
        </div>
    );
};

export default CampaignPage;
