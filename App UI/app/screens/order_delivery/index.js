import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserLocation} from '../../selectors/user';
import OrderDelivery from './order_delivery';

function mapStateToProps(state) {
  const location = getUserLocation(state);
  const restaurant = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  return {
    restaurant,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDelivery);
