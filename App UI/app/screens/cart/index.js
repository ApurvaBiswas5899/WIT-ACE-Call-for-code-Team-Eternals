import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearCart, sendOrder, setCartMenu} from '../../actions/cart';
import {
  getCart,
  getCartError,
  getCartQty,
  getCartTotal,
} from '../../selectors/cart';
import {getFailedMsgForMenus} from '../../selectors/restaurants';
import Cart from './cart';

function mapStateToProps(state) {
  const cart = getCart(state);
  if (Array.isArray(cart.items)) {
    cart.items.sort();
  }
  const failedMsg = getFailedMsgForMenus(state);
  const totalPrice = getCartTotal(state);
  const totalQty = getCartQty(state);
  const error = getCartError(state);
  return {
    cart,
    error,
    totalQty,
    totalPrice,
    failedMsg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        clearCart,
        setCartMenu,
        sendOrder,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
