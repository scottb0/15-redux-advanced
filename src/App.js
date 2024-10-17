import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {Provider, useSelector} from 'react-redux';

function App() {

    const shouldDisplayCart = useSelector(state => state.uiSettings.displayCart);

  return (
    <Layout>
        { shouldDisplayCart && <Cart /> }
      <Products />
    </Layout>
  );
}

export default App;
