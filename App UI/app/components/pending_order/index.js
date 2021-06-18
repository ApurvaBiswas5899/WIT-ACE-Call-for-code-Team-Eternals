import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {pickUpOrder, setOrderRestaurant} from '../../actions/orders';
import { setRestaurant } from '../../actions/views/restaurants';
import {getOrder} from '../../selectors/orders';
import { getRestaurant } from '../../selectors/restaurants';
import PendingOrder from './pendingOrder';

function mapStateToProps(state, ownProps) {
  const {id} = ownProps;
  const order = getOrder(state, id);
  const restaurant = getRestaurant(state, order.restaurantID);
  return {
    order,
    restaurant,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setRestaurant,
        pickUpOrder,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrder);
