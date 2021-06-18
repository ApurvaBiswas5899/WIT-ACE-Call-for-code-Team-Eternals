import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, removeFromCart} from '../../actions/cart';
import {getItemFromCart} from '../../selectors/cart';
import {getMenuItem} from '../../selectors/restaurants';
import CartItem from './cartItem';

function mapStateToProps(state, ownProps) {
  const {id} = ownProps;
  const food = getMenuItem(state, id);
  const currentValueInCart = getItemFromCart(state, id);
  return {
    food,
    currentValueInCart,
    error: ownProps.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addToCart,
        removeFromCart,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
