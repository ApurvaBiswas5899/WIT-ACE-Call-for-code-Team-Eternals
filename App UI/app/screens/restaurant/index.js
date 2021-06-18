import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendOrder} from '../../actions/cart';
import {setRestaurantMenu} from '../../actions/views/restaurants';
import {getCart, getCartQty, getCartTotal} from '../../selectors/cart';
import {
  getRestaurant,
  getRestaurantMenuList,
  getFailedMsgForMenus,
} from '../../selectors/restaurants';
import Restaurant from './restaurant';

function mapStateToProps(state, ownProps) {
  const restaurant = getRestaurant(state, ownProps.route.params.id);
  const menuIds = getRestaurantMenuList(state);
  const cart = getCart(state);
  const totalPrice = getCartTotal(state);
  const totalQty = getCartQty(state);
  let failedMsg;
  if (menuIds.length === 0) {
    failedMsg = getFailedMsgForMenus(state);
  }
  return {
    menuIds,
    failedMsg,
    cart,
    totalQty,
    totalPrice,
    restaurant,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setRestaurantMenu,
        sendOrder,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
