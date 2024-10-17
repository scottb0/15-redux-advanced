import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const DB_URL = 'https://example-project-e28b4-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

function App() {

    const shouldDisplayCart = useSelector(state => state.uiSettings.displayCart);
    const cart = useSelector(state => state.cart);

    useEffect( () => {
        (async () => {
            await fetch(DB_URL,
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                });
        })();
    }, [cart]);

  return (
    <Layout>
        { shouldDisplayCart && <Cart /> }
      <Products />
    </Layout>
  );
}

export default App;
