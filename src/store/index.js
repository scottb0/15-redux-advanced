import {configureStore} from '@reduxjs/toolkit';
import uiSettingsReducer from './uiSettings';
import cartReducer from './cart';

const store = configureStore({
    reducer: {uiSettings: uiSettingsReducer, cart: cartReducer}
});

export default store;
