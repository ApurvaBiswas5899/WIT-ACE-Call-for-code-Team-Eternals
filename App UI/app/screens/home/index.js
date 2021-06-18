import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateLocation} from '../../actions/views/user';
import {setNearRestaurants} from '../../actions/views/restaurants';
import {getUserAddress, getUserLocation} from '../../selectors/user';
import Home from './home';
import {
  getFailedMsgForRestaurants,
  getNearRestaurants,
} from '../../selectors/restaurants';

function mapStateToProps(state) {
  const address = getUserAddress(state);
  const location = getUserLocation(state);
  const restaurantIds = getNearRestaurants(state);
  let failedMsg;
  if (restaurantIds.length === 0) {
    failedMsg = getFailedMsgForRestaurants(state);
  }
  return {
    restaurantIds,
    location,
    failedMsg,
    address,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateLocation,
        setNearRestaurants,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
