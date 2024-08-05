import { ICart } from "@/interfaces/Cart"
import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export type CartState = {
    cart: ICart[]
}

const initialState: CartState = {
    cart: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart: (state, action) => {
            return {
                cart: [...state.cart, action.payload]
            }
        },
        deleteCart: () => {
            return {
                cart: []
            }
        }
    },

})

export const { updateCart, deleteCart } = CartSlice.actions

export const selectCart = (state: AppState) => state.cart

export default CartSlice.reducer