export interface IHome {
    campaign: ICampaign[];
}

export interface ICampaign {
    created_at: string;
    edit_count: number;
    id: string;
    image_url: string;
    name: string;
}
