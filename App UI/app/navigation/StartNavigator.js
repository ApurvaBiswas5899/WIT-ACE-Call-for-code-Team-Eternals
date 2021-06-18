import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';

const stackNavigatorOptions = {
  headerShown: false,
};
const StartNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Register: {screen: Register},
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  },
);
export default createAppContainer(StartNavigator);
