import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import combinedReducers from "./combinedReducer";


interface ThunkExtraArguments {
    store: Store;
}

export function makeStore() {
    const thunkArguments = {} as ThunkExtraArguments;

    const store = configureStore({
        reducer: combinedReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: thunkArguments,
                },
                immutableCheck: false,
            }),
    });

    thunkArguments.store = store;

    return store;
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;
