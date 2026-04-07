export interface Product {
    id?: string | number;
    _id?: string | number;
    imageUrl?: string;
    image?: string;
    name: string;
    description: string;
    originalPrice?: number | string;
    price: number | string;
    sale_price?: number | string;
    percentageOff?: any;
    gallery?: string[];
}
