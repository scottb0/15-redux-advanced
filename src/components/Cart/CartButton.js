import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {uiSettingsActions} from '../../store/uiSettings';

const CartButton = (props) => {

    const cartItems = useSelector(state => state.cart.cartContents);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return null;
    }


  return (
    <button className={classes.button} onClick={() => dispatch(uiSettingsActions.toggleCartDisplay())} >
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
