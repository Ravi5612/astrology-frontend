export interface Product {
    id?: string | number;
    _id?: string | number;
    imageUrl?: string;
    image?: string;
    productImage?: string; // Added to match e-commerce app
    name: string;
    productName?: string; // Added to match e-commerce app
    description: string;
    originalPrice?: number | string;
    price: number | string;
    sale_price?: number | string;
    percentageOff?: any;
    gallery?: string[];
}
