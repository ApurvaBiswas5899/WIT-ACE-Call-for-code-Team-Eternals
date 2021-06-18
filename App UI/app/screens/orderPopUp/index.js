import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {pickUpOrder} from '../../actions/orders';
import {getOrder} from '../../selectors/orders';
import {setRestaurant} from '../../actions/views/restaurants';
import {getRestaurant} from '../../selectors/restaurants';
import OrderPopUp from './orderPopup';

function mapStateToProps(state, ownProps) {
  const id = ownProps.route.params.id;
  const order = getOrder(state, id);
  const restaurant = getRestaurant(state, order?.restaurantID);
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPopUp);
