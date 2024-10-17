import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import Notification from './components/UI/Notification';
import {uiSettingsActions} from './store/uiSettings';
import {cartActions, sendCartData} from './store/cart';

const DB_URL = 'https://example-project-e28b4-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

function App() {

    const shouldDisplayCart = useSelector(state => state.uiSettings.displayCart);
    const notification = useSelector(state => state.uiSettings.notification);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const hasInitialised = useRef(false);
    const hasRespondedToFetch = useRef(false);

    useEffect( () => {
        if (!hasInitialised.current) {
            hasInitialised.current = true;

            dispatch(uiSettingsActions.setNotification({
                status: 'pending',
                title: 'Loading...',
                message: 'Fetching cart data!'
            }));

            (async () => {
                try {
                    const response = await fetch(DB_URL,{ method: 'GET'});
                    if (!response.ok) {
                        throw new Error('Requesting cart data failed.');
                    }
                    const cartData = await response.json();
                    console.log(cartData);
                    dispatch(cartActions.replaceCart(cartData));
                    dispatch(uiSettingsActions.setNotification({
                        status: 'success',
                        title: 'Success!',
                        message: 'Fetched cart data successfully!'
                    }))
                }
                catch (error) {
                    dispatch(uiSettingsActions.setNotification({
                        status: 'error',
                        title: 'Error!',
                        message: 'Requesting cart data failed!'
                    }));
                }
            })();

            return;
        }

        if(!hasRespondedToFetch.current) {
            hasRespondedToFetch.current = true;
            return;
        }

        dispatch(sendCartData(cart));

    }, [cart]);

  return (
      <>
        {notification && <Notification {...notification} />}
        <Layout>
            { shouldDisplayCart && <Cart /> }
          <Products />
        </Layout>
      </>
  );
}

export default App;
