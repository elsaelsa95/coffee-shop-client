import user from "./reducers/user"
import cart from "./reducers/cart"
import session from "./reducers/session"

const combinedReducers = {
    user,
    cart,
    session
};

export default combinedReducers;
