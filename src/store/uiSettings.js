import {createSlice} from '@reduxjs/toolkit';

const uiSettingsSlice = createSlice({
    name: 'cart',
    initialState: {displayCart: false},
    reducers: {
        toggleCartDisplay(state) {
            state.displayCart = !state.displayCart;
        },
    }
});


export default uiSettingsSlice.reducer;
export const uiSettingsActions = uiSettingsSlice.actions;
