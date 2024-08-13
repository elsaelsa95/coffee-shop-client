import { IUser } from "@/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export type SessionState = {
    user?: IUser
}

const initialState: SessionState = {}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        clearUserSession: (state) => {
            state.user = undefined
            window.location.reload()
        }
    }
})

export const { clearUserSession } = sessionSlice.actions

export const selectSession = (state: AppState) => state.session

export default sessionSlice.reducer