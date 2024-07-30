export interface IUser {
    id: string
    fisrtName: string
    phoneNumber: string
    point: number
}

export interface IUserFavorite {
    userId: string
    coffeeId: string
}

export interface userHistory {
    userId: string
    detail: IHistory[]
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