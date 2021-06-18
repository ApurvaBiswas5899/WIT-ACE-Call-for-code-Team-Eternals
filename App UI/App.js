import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {
  Restaurant,
  OrderDelivery,
  Register,
  Login,
  Verification,
  Cart,
  PastOrders,
  Profile,
  OrderPopUp,
} from './app/screens';
import Tabs from './app/navigation/tabs';
import appStore from './app/store';
import * as Location from 'expo-location';

import {getAuth, updateLocation} from './app/actions/views/user';
import {COLORS} from './app/constants';
import MapboxGL from '@react-native-mapbox-gl/maps';
const accessToken =
  'pk.eyJ1IjoieWFzaDF0cyIsImEiOiJja2w0NDUwbnkwN3p5Mm5wanhtc3d2ZmlpIn0.ujEt3kkCh3qdU738PDgCcw';

MapboxGL.setAccessToken(accessToken);

const Stack = createStackNavigator();

const App = () => {
  const [status, setStatus] = useState({status: 0});
  useEffect(() => {
    getLocation();
    appStore.dispatch(getAuth()).then(result => {
      if (result?.success) {
        setStatus({status: 1});
      } else {
        setStatus({status: -1});
      }
    });
  }, []);

  const getLocation = async () => {
    const {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
    } else {
      appStore.dispatch(updateLocation());
    }
  };

  let initialRouteName = 'Login';

  if (status.status === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Image
          source={require('./app/assets/images/icon.png')}
          resizeMode="contain"
          style={{width: 150, height: 150, padding: 20}}
        />
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  if (status.status === 1) {
    initialRouteName = 'Home';
  }

  return (
    <>
      <Provider store={appStore}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: '#2225'},
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({current}) => ({
                cardStyle: {
                  opacity: current.progress,
                },
              }),
            }}
            mode="modal"
            initialRouteName={initialRouteName}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PastOrders" component={PastOrders} />
            <Stack.Screen name="OrderPopUp" component={OrderPopUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};
export default App;
