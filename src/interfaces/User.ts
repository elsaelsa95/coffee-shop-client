import { ICoffee } from "./Coffee"

export interface IUser {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    photoProfile: string
    point: number
    favorites: ICoffee[]
    history: IHistory[]
}
export interface IHistory {
    idHistory: string
    date: string
    description: IDetailHistory[]
    subtotal: number
    redeemPoint: number
    total: number
    getPoint: number
}

export interface IDetailHistory {
    itemId: string
    itemName: string
    itemImage: string
    itemSize: string
    itemPrice: number
    quantity: number
    totalPrice: number
}