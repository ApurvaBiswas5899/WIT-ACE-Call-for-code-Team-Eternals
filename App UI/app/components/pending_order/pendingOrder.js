import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, Text, Image} from 'react-native';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export default function PendingOrder({actions, order, restaurant}) {
  const date = new Date(order.created);
  const navigation = useNavigation();
  const [resIcon, setResIcon] = useState({
    uri: restaurant?.images[0] || 'error',
  });

  const onImageError = () => {
    setResIcon(require('../../assets/images/foodItem.png'));
  };
  useEffect(() => {
    actions.setRestaurant(order.restaurantId);
  },[]);
  return (
    <View style={styles.container}>
      <Pressable
        style={{flexDirection: 'row', padding: 5, justifyContent: 'center'}}
        onPress={() => {
          navigation.navigate('OrderPopUp', {id: order._id});
        }}>
        <Image
          style={{height: 50, width: 50}}
          source={resIcon}
          onError={onImageError}
        />
        <View>
          <View style={{paddingStart: 10}}>
            <Text style={{padding: 5, fontWeight: 'bold'}}>
              {restaurant?.restaurantName || ''}
            </Text>
            <Text style={styles.title}>
              {`${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`}
            </Text>
          </View>
        </View>
        <View
          style={{alignItems: 'flex-end', flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>{`\u20B9 ${order.total}       `}</Text>
          <Text style={{color: 'red', padding: 5}}>NOT PAID</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    padding: 5,
  },
  details: {
    paddingHorizontal: 10,
  },
});
