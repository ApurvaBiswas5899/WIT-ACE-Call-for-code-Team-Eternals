import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PastOrders from './past_orders';
import {getPastOrdersIds} from '../../selectors/orders';
import { getPastOrders } from '../../actions/orders';

function mapStateToProps(state) {
  const pastOrdersIds = getPastOrdersIds(state);
  return {
    pastOrdersIds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPastOrders,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
