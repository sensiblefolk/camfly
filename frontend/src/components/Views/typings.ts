export interface IHome {
    campaign: ICampaign[];
}

export interface ICampaignQuery {
    campaign_by_pk: Partial<ICampaign>
}

export interface ICampaign {
    created_at: string;
    edit_count: number;
    download_count: number;
    id: string;
    image_url: string;
    name: string;
}


