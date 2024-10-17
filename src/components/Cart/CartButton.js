import classes from './CartButton.module.css';
import {useSelector} from 'react-redux';

const CartButton = (props) => {

    const cartItems = useSelector(state => state.cartContents);

    if (cartItems.length === 0) {
        return null;
    }

  return (
    <button className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
