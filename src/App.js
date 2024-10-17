import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import Notification from './components/UI/Notification';
import {uiSettingsActions} from './store/uiSettings';

const DB_URL = 'https://example-project-e28b4-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

function App() {

    const shouldDisplayCart = useSelector(state => state.uiSettings.displayCart);
    const notification = useSelector(state => state.uiSettings.notification);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const isInitial = useRef(true);

    useEffect( () => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }

        dispatch(uiSettingsActions.setNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        (async () => {
            try {
                const response = await fetch(DB_URL,
                    {
                        method: 'PUT',
                        body: JSON.stringify(cart),
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
        })();
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
