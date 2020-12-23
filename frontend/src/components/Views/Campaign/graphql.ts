import { gql } from '@apollo/client';

export const NEW_CAMPAIGN = gql`
    mutation newCampaign($createdAt: String!, $imageUrl: String!, $name: String!) {
        insert_campaign_one(object: { created_at: $createdAt, image_url: $imageUrl, name: $name }) {
            id
        }
    }
`;
