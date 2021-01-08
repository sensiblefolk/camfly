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
            id
            image_url
            name
        }
    }
`;

export const INC_DOWNLOAD = gql`
    mutation incrementDownload($id: String!) {
        update_campaign(where: { id: { _eq: $id } }, _inc: { download_count: 1 }) {
            affected_rows
        }
    }
`;
