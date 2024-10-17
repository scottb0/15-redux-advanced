import {createSlice} from '@reduxjs/toolkit';
import {uiSettingsActions} from './uiSettings';

const DB_URL = 'https://example-project-e28b4-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

const initialCartState = {
    cartContents: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action) {
            state.cartContents = action.payload.cartContents;
        },
        addItem(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If the item exists, update the quantity
                state.cartContents[existingItemIndex].quantity += 1;
            } else {
                // If the item does not exist, add it as a new item
                state.cartContents.push({ id: action.payload.id, title: action.payload.title, quantity: 1, price: action.payload.price});
            }
        },
        incQuantity(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            state.cartContents[existingItemIndex].quantity += 1;
        },
        decQuantity(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            if (state.cartContents[existingItemIndex].quantity <= 1) {
                // splice works with redux toolkit otherwise would do cart = cart.filter(...!=id...)
                state.cartContents.splice(existingItemIndex, 1);
            }
            else {
                state.cartContents[existingItemIndex].quantity -= 1;
            }
        }
    }
});

const getTotalCartPrice = (cartContents) => {
    return cartContents.reduce(
        (total, item) => total + item.price * item.quantity, 0);
}

export const sendCartData = (cartContents) => {
    return async (dispatch) => {
        dispatch(uiSettingsActions.setNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        try {
            const response = await fetch(DB_URL,
                {
                    method: 'PUT',
                    body: JSON.stringify(cartContents),
                });
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
            await response.json();
            dispatch(uiSettingsActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }))
        }
        catch (error) {
            dispatch(uiSettingsActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
    };
}

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(uiSettingsActions.setNotification({
            status: 'pending',
            title: 'Loading...',
            message: 'Fetching cart data!'
        }));

        try {
            const response = await fetch(DB_URL, {method: 'GET'});
            if (!response.ok) {
                throw new Error('Requesting cart data failed.');
            }
            const cartData = await response.json();
            dispatch(cartActions.replaceCart(cartData));
            dispatch(uiSettingsActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Fetched cart data successfully!'
            }))
        } catch (error) {
            dispatch(uiSettingsActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }));
        }
    };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
