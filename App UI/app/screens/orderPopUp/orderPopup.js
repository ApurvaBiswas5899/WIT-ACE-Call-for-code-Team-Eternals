import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../components/icon';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {COLORS} from '../../constants';

export default function OrderPopUp({actions, order, navigation, restaurant}) {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [resIcon, setResIcon] = useState({
    uri: restaurant?.images[0] || 'error',
  });
  const date = new Date(order.created);

  const onImageError = () => {
    setResIcon(require('../../assets/images/foodItem.png'));
  };

  const pickUpOrder = async () => {
    // setIsLoading(true);
    const result = await actions.pickUpOrder(order.id);
    if (!result) {
      Alert.alert('Pick Up Failed');
      // setIsLoading(false);
    }
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Pressable
          style={{flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
          <Image
            style={{height: 50, width: 50}}
            source={resIcon}
            onError={onImageError}
          />
          <View>
            <View style={{paddingStart: 10}}>
              <Text style={{padding: 5, fontWeight: 'bold'}}>
                {restaurant.restaurantName}
              </Text>
              <Text style={{padding: 5}}>
                {`${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
              justifyContent: 'center',
              padding: 10,
            }}>
            <Icon
              name="info"
              color="grey"
              size={32}
              onPress={() =>
                navigation.navigate('Restaurant', {id: order.restaurantID})
              }
            />
          </View>
        </Pressable>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={{flexDirection: 'column', paddingTop: 10}}>
        {order?.foodItems &&
          Object.keys(order.foodItems).map(id => (
            <View key={id}>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <Text style={{paddingHorizontal: 10, flex: 3}}>
                  {order.foodItems[id].name}
                </Text>
                <Text style={{flex: 1}}>{`${order.foodItems[id].qty} `}</Text>
                <Text style={{flex: 1}}>{`\u20B9 ${
                  order.foodItems[id].qty * order.foodItems[id].price
                }`}</Text>
              </View>
              <View style={{backgroundColor: '#e3e3FF', height: 1}} />
            </View>
          ))}
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Text style={{paddingHorizontal: 10, flex: 4}}>Total</Text>
          <Text style={{flex: 1}}>{`\u20B9 ${order.total}`}</Text>
        </View>
      </View>
    );
  };

  const CenterCoordinate = [77.6033591, 12.9086331];

  const renderMap = () => {
    return (
      <>
        {loading && (
          <View style={{height: 300}}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
        <View style={{height: 300, marginTop: 30, marginBottom: 30}}>
          <MapboxGL.MapView
            logoEnabled={false}
            compassEnabled={false}
            onDidFinishRenderingMapFully={() => setLoading(false)}
            zoomLevel={14}
            style={{flex: 1}}>
            <MapboxGL.Camera
              zoomLevel={14}
              animationMode="flyTo"
              animationDuration={0}
              centerCoordinate={CenterCoordinate}
              followUserLocation={false}
              defaultSettings={{
                centerCoordinate: CenterCoordinate,
                followUserLocation: false,
                followUserMode: 'normal',
              }}
            />
          </MapboxGL.MapView>
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{flexDirection: 'column', paddingBottom: 30}}>
        {error && <Text>{error}</Text>}
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: '#E3E3E3',
              alignItems: 'center',
              marginVertical: 5,
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: '800'}}>CANCEL </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 2,
              borderColor: COLORS.primary,
              borderWidth: 1.5,
              marginVertical: 5,
              marginStart: 10,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.primary, fontWeight: '800'}}>
              PICKED UP
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
        style={{
          backgroundColor: '#fff',
          margin: 40,
          borderRadius: 10,
          padding: 15,
        }}>
        {renderHeader()}
        {renderBody()}
        {renderMap()}
        {renderFooter()}
      </ScrollView>
    </SafeAreaView>
  );
}
