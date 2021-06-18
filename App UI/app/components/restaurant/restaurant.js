import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Image, Text} from 'react-native';
import GlobalStyles from '../../screenStyle';
import {getCategoryName} from '../../utils/helpers';

const IMG =
  'https://static.toiimg.com/thumb/74045175.cms?width=680&height=512&imgsize=1038909';

export default function RestaurantItem(props) {
  const {navigation, restaurant} = props;

  const [image, setImage] = useState(restaurant?.images[0] || IMG);

  const showRestaurant = () => {
    if (!restaurant.status) {
      return;
    }
    const passProps = {
      id: restaurant._id,
    };
    navigation.navigate('Restaurant', passProps);
  };

  if (restaurant) {
    return (
      <Pressable
        style={[GlobalStyles.pressableIOS, styles.container]}
        android_ripple={{color: 'white'}}
        onPress={showRestaurant}>
        <Image
          source={{uri: image}}
          onError={() => {
            setImage(IMG);
          }}
          style={{
            height: 145,
            borderRadius: 10,
            opacity: restaurant.status ? 1 : 0.5,
          }}
        />
        <View style={styles.title}>
          <Text>{restaurant.restaurantName}</Text>
          {!restaurant.status && (
            <Text style={{color: 'red', marginHorizontal: 20}}>Closed</Text>
          )}
        </View>
        <View style={styles.details}>
          <Text>{getCategoryName(restaurant.category)}</Text>
        </View>
      </Pressable>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingBottom: 10,
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  details: {
    paddingHorizontal: 10,
  },
});
