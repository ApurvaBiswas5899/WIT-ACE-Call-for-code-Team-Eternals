import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Image, Text} from 'react-native';
import {COLORS} from '../../constants';
import GlobalStyles from '../../screenStyle';
import Icon from '../icon';

export default function CartItem(props) {
  const {food, actions, currentValueInCart, error} = props;
  const [foodIcon, setFoodIcon] = useState({
    uri: food?.images[0] || 'error',
  });

  const onImageError = () => {
    setFoodIcon(require('../../assets/images/foodItem.png'));
  };

  const renderButton = () => (
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

  if (food) {
    if (currentValueInCart === 0) {
      return null;
    }
    return (
      <View
        style={[styles.container, {backgroundColor: error ? '#edd' : '#fff'}]}>
        <Image
          source={foodIcon}
          style={{height: 40, width: 40}}
          onError={onImageError}
        />
        <View style={styles.title}>
          <Text>{`${food.name}`}</Text>
          <Text>
            {`${food.price} X ${currentValueInCart} = \u20B9 ${
              currentValueInCart * food.price
            }`}
          </Text>
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
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
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
