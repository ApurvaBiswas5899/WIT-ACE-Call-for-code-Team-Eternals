import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Register from './register';
import {registerUser} from '../../actions/views/user';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        registerUser,
      },
      dispatch,
    ),
  };
}

export default connect(null, mapDispatchToProps)(Register);
