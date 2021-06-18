import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  Pressable,
} from 'react-native';

import FoodItem from '../../components/food_item/index';
import Icon from '../../components/icon';

import {COLORS, SIZES, FONTS} from '../../constants';

const Restaurant = ({
  navigation,
  restaurant,
  actions,
  menuIds,
  failedMsg,
  cart,
  totalPrice,
  totalQty,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const reload = async () => {
    await actions.setRestaurantMenu(restaurant._id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      reload();
    }
  }, [isLoading]);

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <Pressable
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="left" color="#000" size={24} />
        </Pressable>

        {/* Restaurant Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant.restaurantName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }

  const refreshView = (
    <RefreshControl
      onRefresh={() => {
        setIsLoading(true);
      }}
      refreshing={isLoading}
    />
  );

  const renderItem = ({item}) => <FoodItem id={item} restaurant={restaurant} />;

  function renderFoodInfo() {
    return (
      <FlatList
        data={menuIds}
        refreshing={isLoading}
        keyExtractor={item => `${item}`}
        renderItem={renderItem}
        refreshControl={refreshView}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
      />
    );
  }

  function renderOrder() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopWidth: 2,
          borderTopColor: '#f00',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}>
          <Text style={{...FONTS.h3}}>{`${totalQty} items in Cart`}</Text>
          <Text style={{...FONTS.h3}}>{`\u20B9 ${totalPrice}`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <Pressable style={{flexDirection: 'row', flex: 1}}>
            <Icon name="location" color="#000" size={24} />
            <Text
              numberOfLines={2}
              style={{
                marginLeft: SIZES.padding,
                ...FONTS.h4,
                paddingRight: 20,
              }}>
              {restaurant.Address}
            </Text>
          </Pressable>

          <View style={{flexDirection: 'row', flex: 1}}>
            <Icon name="info" color="#000" size={24} />
            <Text
              style={{
                marginLeft: SIZES.padding,
                ...FONTS.h4,
                paddingRight: 20,
              }}>
              {restaurant.restaurantName}
            </Text>
          </View>
        </View>

        {/* Order Button */}
        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={{color: COLORS.white, ...FONTS.h2}}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderError = () => (
    <View>
      <Text>{failedMsg}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {failedMsg ? renderError() : renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
});

export default Restaurant;
