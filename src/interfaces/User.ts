import { ICoffee } from "./Coffee"

export interface IUser {
    id: string
    firstName: string
    phoneNumber: string
    point: number
    favorites: ICoffee[]
    history: IHistory[]
}
export interface IHistory {
    idHistory: string
    date: string
    description: IDetailHistory[]
    summary: number
    getPoint: number
}

export interface IDetailHistory {
    itemId: string
    itemName: string
    itemSize: string
    itemPrice: number
    quantity: number
    totalPrice: number
}