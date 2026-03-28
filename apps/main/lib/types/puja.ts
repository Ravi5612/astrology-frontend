import { ExpertProfile } from "./astrologer";

export interface PujaSamagriItem {
    name: string;
    quantity: string;
}

export interface ExpertPuja {
    id: number;
    expert_id: number;
    type: 'online' | 'home_visit';
    name: string;
    min_duration_hours: number;
    max_duration_hours: number;
    cost: number;
    description: string | null;
    districts: string[] | null;
    samagri_list: PujaSamagriItem[] | null;
    created_at: string;
    updated_at: string;
    expert?: ExpertProfile;
}
