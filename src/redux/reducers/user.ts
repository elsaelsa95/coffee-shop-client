import { IUser } from "@/interfaces/User";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export type SignInState = {
    user: IUser,
    isLoading: boolean,
    isError: boolean
}

const initialState: SignInState = {
    user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        photoProfile: "",
        point: 0,
        favorites: [],
        history: []
    },
    isLoading: false,
    isError: false
}

export const getUserDetail = createAsyncThunk("fetchUser", async (id: string) => {
    const data = await fetch(`http://localhost:8000/users/${id}`)
    return data.json()
})

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getUserDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(getUserDetail.rejected, (state) => {
                state.isError = true
            })
    }
})

export const { } = UserSlice.actions

export const selectUser = (state: AppState) => state.user;

export default UserSlice.reducer