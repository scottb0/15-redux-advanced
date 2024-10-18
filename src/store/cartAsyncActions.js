import {uiSettingsActions} from './uiSettings';
import {cartActions} from './cart';

const DB_URL = 'https://example-project-e28b4-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

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
