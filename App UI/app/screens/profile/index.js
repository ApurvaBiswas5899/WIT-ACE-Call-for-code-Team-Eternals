import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPastOrders} from '../../actions/orders';
import {logout} from '../../actions/views/user';
import {getPendingOrdersIds} from '../../selectors/orders';
import {getUserProfile} from '../../selectors/user';
import Profile from './profile';

function mapStateToProps(state) {
  const profile = getUserProfile(state)?.auth;
  const pendingOrdersIds = getPendingOrdersIds(state);
  return {
    profile,
    pendingOrdersIds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        logout,
        getPastOrders,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
