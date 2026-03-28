export interface CustomService {
    id: string;
    name: string;
    price: number;
    unit: string;
}

export interface TeamMember {
  name: string;
  role: string;
  exp: string;
  avatar: string;
  specialty: string;
}

export interface ExpertProfile {
    id: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
        language?: string;
    };
    name?: string;
    image?: string;
    specialization: string;
    expertise?: string;
    experience_in_years: number;
    experience?: number;
    languages: string[];
    price: number;
    rating: number;
    ratings?: number;
    is_available: boolean;
    is_online?: boolean;
    video?: string;
    chat_price?: number;
    call_price?: number;
    video_call_price?: number;
    report_price?: number;
    horoscope_price?: number;
    total_likes?: number;
    bio?: string;
    detailed_experience?: any[];
    gallery?: string[];
    videos?: string[];
    custom_services?: CustomService[] | string;
}

export interface Astrologer {
    id?: number | string;
    userId?: number | string;
    image: string;
    name: string;
    expertise: string;
    experience: number;
    language: string;
    price: number;
    chat_price?: number;
    call_price?: number;
    video_call_price?: number;
    report_price?: number;
    horoscope_price?: number;
    video?: string;
    ratings?: number;
    modalId?: string;
    is_available?: boolean;
    is_online?: boolean;
    total_likes?: number;
    bio?: string;
    detailed_experience?: any[];
    gallery?: string[];
    videos?: string[];
    custom_services?: CustomService[];
}

export type ClientExpertProfile = Astrologer;

// Component Props & State Types
export interface AstrologerFilterState {
    language: string;
    minPrice: number;
    maxPrice: number;
    addressState: string;
    serviceType: string;
    minRating: number;
    onlyOnline: boolean;
    sortBy: string;
}

export interface AstrologerFilterModalProps {
    modalId: string;
    localFilter: AstrologerFilterState;
    setLocalFilter: (filter: AstrologerFilterState) => void;
    applyFilters: () => void;
    resetFilters: () => void;
}

export interface AstrologerSortModalProps {
    modalId: string;
    sortBy: string;
    setSortBy: (sort: string) => void;
    applySort: () => void;
}

export interface AstrologerListHeaderProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedSpecialization: string;
    setSelectedSpecialization: (s: string) => void;
    hasActiveFilters: boolean;
    filterModalId: string;
    sortModalId: string;
    resetFilters: () => void;
    scrollTabs: (direction: "left" | "right") => void;
    scrollContainerRef: any; // React.RefObject<HTMLDivElement | null>;
}

export interface AstrologerListWrapperProps {
    searchParams: Record<string, string | string[] | undefined>;
    layout?: 'slider' | 'grid';
    title?: string;
}

export interface ExpertSectionProps {
    team: TeamMember[];
}

export interface AstrologerCardProps {
    astrologerData: Astrologer;
    cardClassName?: string;
}

export const astrologerSpecializations = [
    "Numerology",
    "Vedic",
    "Zodiac Compatibility",
    "Astrocartography",
    "Lunar Node Analysis",
    "Love Problem Solution",
    "Marriage Problem",
    "Divorce Problem Solution",
    "Breakup Problem Solution",
    "Get Your Ex Love Back",
    "Family Problem Solution",
    "Dispute Solution",
    "Childless Couple Solution"
];
