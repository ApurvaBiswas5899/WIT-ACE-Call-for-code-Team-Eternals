import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getRestaurant} from '../../selectors/restaurants';
import Restaurant from './restaurant';

function mapStateToProps(state, ownProps) {
  const {id} = ownProps;
  const restaurant = getRestaurant(state, id);
  return {
    restaurant,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
