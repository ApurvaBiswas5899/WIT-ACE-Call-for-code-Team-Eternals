import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import * as Location from 'expo-location';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {SIZES, COLORS, FONTS} from '../../constants';
import Icon from '../../components/icon';
import RestaurantItem from '../../components/restaurant/index';

const Home = props => {
  const {navigation, location} = props;

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    const {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      await props.actions.updateLocation();
      getList();
    }
  };

  useEffect(() => {
    if (!location?.coords) {
      getLocation();
    }
  }, []);

  const getList = async () => {
    await props.actions.setNearRestaurants();
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getList();
    }
  }, []);

  const renderHeader = () => {
    let {address, actions} = props;
    if (!address) {
      address = {
        district: '???',
        city: '???',
      };
    }
    return (
      <View style={{flexDirection: 'row', height: 50, paddingTop: 10}}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/icons/icon.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableWithoutFeedback>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              /* backgroundColor: COLORS.lightGray3, */
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{fontSize: 16}}>{`${
              address.district || address.subregion
            }, ${address.city}`}</Text>
          </View>
        </View>

        <TouchableWithoutFeedback
          style={{
            flex: 1,
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Cart')}>
          <Icon name="basket" color="#000" size={24} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderSearchBar = () => (
    <View style={{paddingTop: SIZES.padding, marginBottom: 20}}>
      <TextInput
        placeholder="Search Meal"
        placeholderTextColor={COLORS.secondary}
        style={{
          borderColor: COLORS.primary,
          borderWidth: 1,
          height: 40,
          fontSize: 18,
          padding: 10,
          paddingLeft: 15,
          borderRadius: 5,
          marginHorizontal: SIZES.padding * 2,
        }}
      />
    </View>
  );

  const refreshView = (
    <RefreshControl
      onRefresh={() => {
        setIsLoading(true);
      }}
      refreshing={isLoading}
    />
  );

  const renderRestaurantList = () => {
    const {restaurantIds} = props;

    const renderItem = ({item}) => (
      <RestaurantItem id={item} navigation={props.navigation} />
    );

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={restaurantIds}
          keyExtractor={item => `${item}`}
          renderItem={renderItem}
          refreshControl={refreshView}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 30,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
