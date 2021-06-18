import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MapScreen from './map_screen';

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
