import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from './login';
import {loginUser, getAuth} from '../../actions/views/user';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loginUser,
        getAuth,
      },
      dispatch,
    ),
  };
}

export default connect(null, mapDispatchToProps)(Login);
