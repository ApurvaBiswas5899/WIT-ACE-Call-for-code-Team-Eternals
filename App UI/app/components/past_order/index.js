import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setRestaurant} from '../../actions/views/restaurants';
import {getOrder} from '../../selectors/orders';
import {getRestaurant} from '../../selectors/restaurants';
import PastOrder from './pastOrder';

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
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrder);
