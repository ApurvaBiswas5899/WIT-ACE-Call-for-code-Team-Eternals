import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Image, Text, Alert} from 'react-native';
import {COLORS} from '../../constants';
import GlobalStyles from '../../screenStyle';
import Icon from '../icon';

export default function FoodItem(props) {
  const {food, actions, currentValueInCart, restaurant, cartRestaurant} = props;
  const [foodIcon, setFoodIcon] = useState({
    uri: food?.images[0] || 'error',
  });

  const onImageError = () => {
    setFoodIcon(require('../../assets/images/foodItem.png'));
  };

  const checkIfNewCartNeeded = action => {
    if (cartRestaurant.id === '') {
      action();
      return false;
    }
    if (cartRestaurant.id !== restaurant._id) {
      Alert.alert(
        'Do you want to clear the cart?',
        `There is already some items in cart from ${cartRestaurant.name}.`,
        [
          {text: 'Clear', onPress: () => action()},
          {text: 'Cancel', onPress: () => false},
        ],
        {cancelable: false},
      );
    } else {
      return true;
    }

    return false;
  };

  const onAddWithCheck = () => {
    if (
      checkIfNewCartNeeded(() => {
        actions.newCart(restaurant._id, restaurant.restaurantName);
        actions.addToCart(food._id);
      })
    ) {
      actions.addToCart(food._id);
    }
  };

  const renderButton = () => {
    if (currentValueInCart === 0) {
      return (
        <Pressable
          style={[GlobalStyles.pressableIOS]}
          android_ripple={{color: COLORS.primary}}
          onPress={() => onAddWithCheck()}>
          <Text style={{color: COLORS.primary, margin: 5}}>Add +</Text>
        </Pressable>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          style={[GlobalStyles.pressableIOS, {padding: 4}]}
          android_ripple={{color: COLORS.primary}}
          onPress={() => actions.removeFromCart(food._id)}>
          <Icon name="minus" size={16} color="black" />
        </Pressable>
        <Text style={{paddingHorizontal: 5}}>{currentValueInCart}</Text>
        {currentValueInCart !== 10 && (
          <Pressable
            style={[GlobalStyles.pressableIOS, {padding: 4}]}
            android_ripple={{color: COLORS.primary}}
            onPress={() => actions.addToCart(food._id)}>
            <Icon name="plus" size={16} color="black" />
          </Pressable>
        )}
      </View>
    );
  };

  if (food) {
    return (
      <View style={styles.container}>
        <Image
          source={foodIcon}
          style={{height: 50, width: 50, borderRadius: 25}}
          onError={onImageError}
        />
        <View style={styles.title}>
          <Text>{`${food.name} | ${'North'}`}</Text>
          <Text>{`\u20B9 ${food.price}`}</Text>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <View style={[styles.button, {flexDirection: 'row'}]}>
            {renderButton()}
          </View>
        </View>
      </View>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  button: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: 'row',
  },
  title: {
    justifyContent: 'center',
    padding: 10,
  },
  details: {
    paddingHorizontal: 10,
  },
});
