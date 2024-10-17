import {createSlice} from '@reduxjs/toolkit';

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

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
