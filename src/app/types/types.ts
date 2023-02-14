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
}

export interface ProductData {
    id: number;
    description: string;
    category: CategoryEnum,
    imageURL?: string;
    name: string;
    price: number;
    quantity: number;
    details?: string;
    rating?: number;
    availableSizes?:string[];
    colors?:string[];
};
