import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import Notification from './components/UI/Notification';
import {fetchCartData, sendCartData} from './store/cartAsyncActions';

function App() {

    const shouldDisplayCart = useSelector(state => state.uiSettings.displayCart);
    const notification = useSelector(state => state.uiSettings.notification);
    const cartContents = useSelector(state => state.cart.cartContents);
    const cartUpdated = useSelector(state => state.cart.updated);
    const dispatch = useDispatch();
    const hasInitialised = useRef(false);

    useEffect( () => {
        dispatch(fetchCartData());
    }, []);

    useEffect( () => {
        if (!hasInitialised.current) {
            hasInitialised.current = true;
        }
        else if(cartUpdated) {
            dispatch(sendCartData({cartContents: cartContents}));
        }
    }, [cartContents, dispatch]);

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
