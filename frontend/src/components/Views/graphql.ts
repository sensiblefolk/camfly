import { gql } from '@apollo/client';

export const HOME = gql`
    query Home {
        campaign(order_by: { created_at: desc }) {
            created_at
            edit_count
            download_count
            id
            image_url
            name
        }
    }
`;

export const GET_CAMPAIGN = gql`
    query getCampaign($id: String!) {
        campaign_by_pk(id: $id) {
            download_count
            id
            image_url
            name
        }
    }
`;
