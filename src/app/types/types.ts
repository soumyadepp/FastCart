export enum CategoryEnum {
    fashion = "FASHION",
    electronics = "ELECTRONICS",
    cameras = "CAMERAS",
    drones = "DRONES",
    laptops = "LAPTOPS",
    phones = "PHONES",
    tablets = "TABLETS",
    kitchen_appliances = "KITCHEN APPLIANCES",
    miscallaneous = "MISCALLANEOUS",
    watches = "WATCHES",
    television = "TELEVISION"
};

export enum ClothingSizesEnum {
    extraSmall="XS",
    small="S",
    medium="M",
    large="L",
    extraLarge="XL",
    extraExtraLarge="XXL",
    plusSize="MXL"
};

export interface ProductData {
    id: number;
    description: string;
    category: CategoryEnum,
    imageURL?: string;
    name: string;
    price: number;
    quantity: number;
    details?: string;
    rating: number;
    availableSizes?:any[];
    colors?:string[];
    variants?: any[];
};

export interface FashionProduct extends ProductData{
    id:number;
    description: string;
    category: CategoryEnum.fashion;
    name:string;
    price:number;
    quantity:number;
    details:string;
    rating:number;
    availableSizes?:ClothingSizesEnum[];
}

