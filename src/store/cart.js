import {configureStore} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    cartContents: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialAuthState,
    reducers: {
        addItem(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If the item exists, update the quantity
                state.cartContents[existingItemIndex].quantity += 1;
            } else {
                // If the item does not exist, add it as a new item
                state.cartContents.push({ id: action.payload.id, quantity: 1, price: action.payload.price});
            }
        },
        incQuantity(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            state.cartContents[existingItemIndex].quantity += 1;
        },
        decQuantity(state, action) {
            const existingItemIndex = state.cartContents.findIndex(item => item.id === action.payload.id);
            if (state.cartContents[existingItemIndex].quantity <= 1) {
                state.cartContents.splice(existingItemIndex, 1);
            }
            else {
                state.cartContents[existingItemIndex].quantity -= 1;
            }
        }
    }
});

const store = configureStore({
    reducer: cartSlice.reducer
});


export default store;
export const cartActions = cartSlice.actions;
