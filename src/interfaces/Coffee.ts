export interface ICoffee {
    id: string;
    category: string;
    image: string;
    rating: number;
    itemName: string;
    topping: string;
    description: string;
    price: IPriceList[]
}

export interface IPriceList {
    size: string
    price: number
}