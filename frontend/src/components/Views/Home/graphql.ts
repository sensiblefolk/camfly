import { gql } from '@apollo/client';

export const HOME = gql`
    query Home {
        campaign(order_by: { created_at: desc }) {
            created_at
            edit_count
            id
            image_url
            name
        }
    }
`;
