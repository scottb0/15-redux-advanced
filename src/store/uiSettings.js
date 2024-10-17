import {createSlice} from '@reduxjs/toolkit';

const uiSettingsSlice = createSlice({
    name: 'cart',
    initialState: {displayCart: false, notification: null},
    reducers: {
        toggleCartDisplay(state) {
            state.displayCart = !state.displayCart;
        },
        setNotification(state, action) {
            state.notification = action.payload;
        },
    }
});


export default uiSettingsSlice.reducer;
export const uiSettingsActions = uiSettingsSlice.actions;
