import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, newCart, removeFromCart} from '../../actions/cart';
import {getItemFromCart, getCartRestaurant} from '../../selectors/cart';
import {getMenuItem} from '../../selectors/restaurants';
import FoodItem from './food_item';

function mapStateToProps(state, ownProps) {
  const {id, restaurant} = ownProps;
  const food = getMenuItem(state, id);
  const currentValueInCart = getItemFromCart(state, id);
  const cartRestaurant = getCartRestaurant(state) || {id: '', name: ''};
  return {
    food,
    restaurant,
    currentValueInCart,
    cartRestaurant,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addToCart,
        removeFromCart,
        newCart,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
