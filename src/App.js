import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import Notification from './components/UI/Notification';
import {uiSettingsActions} from './store/uiSettings';
import {cartActions, fetchCartData, sendCartData} from './store/cart';

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
            dispatch(fetchCartData());
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
