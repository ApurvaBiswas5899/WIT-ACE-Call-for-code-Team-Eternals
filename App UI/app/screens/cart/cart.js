import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CartItem from '../../components/cart_item/index';
import {COLORS, FONTS, SIZES} from '../../constants';
import ProcessButton from '../../components/proceed_button';
import Icon from '../../components/icon';

export default function Cart({
  actions,
  cart,
  failedMsg,
  navigation,
  totalPrice,
  totalQty,
  error,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const clearCart = async () => {
    await actions.clearCart();
  };

  const reload = async () => {
    await actions.setCartMenu();
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      reload();
    }
  }, [isLoading]);

  const renderBody = () => {
    if (totalQty === 0) {
      return (
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 10,
              fontSize: 24,
            }}>
            Cart is Empty
          </Text>
        </View>
      );
    }
    return (
      <>
        {failedMsg ? renderError() : renderCart()}
        {renderOrder()}
      </>
    );
  };

  const onOrder = async () => {
    setProcessing(true);
    const result = await actions.sendOrder();
    if (!result) {
      Alert.alert('Oops', error?.message || 'Something went wrong');
      setIsLoading(true);
    }
    setProcessing(false);
  };

  let orderButton;
  if (totalQty <= 20) {
    orderButton = (
      <Pressable
        style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          alignSelf: 'stretch',
          borderRadius: SIZES.radius,
        }}
        android_ripple={{color: 'red'}}
        onPress={onOrder}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
      </Pressable>
    );
  } else {
    orderButton = (
      <View
        style={{
          padding: SIZES.padding,
          borderColor: COLORS.primary,
          alignItems: 'center',
          borderWidth: 1,
          alignSelf: 'stretch',
          borderRadius: SIZES.radius,
        }}>
        <Text style={{color: COLORS.primary}}>
          Cannot order more than 20 items
        </Text>
      </View>
    );
  }

  const renderError = () => (
    <View>
      <Text>{failedMsg}</Text>
    </View>
  );

  const renderHeader = () => (
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
            paddingRight: 80,
            borderRadius: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3}}>Cart</Text>
        </View>
      </View>
    </View>
  );

  const renderOrder = () => (
    <View
      style={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 2,
        borderTopColor: '#f00',
        padding: 10,
      }}>
      <Text style={{color: 'black', margin: 10, fontSize: 18}}>
        Payment Method
      </Text>
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: '#ddd',
          borderRadius: 5,
          padding: 10,
        }}>
        <Text> Cash on Pickup</Text>
      </View>

      <View
        style={{
          padding: SIZES.padding * 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ProcessButton observe={processing} button={orderButton} />
        <Pressable
          style={{
            padding: SIZES.padding,
            marginTop: 10,
            alignSelf: 'stretch',
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
          }}
          onPress={clearCart}>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>Clear Cart</Text>
        </Pressable>
      </View>
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

  const renderCart = () => (
    <ScrollView
      refreshing={isLoading}
      refreshControl={refreshView}
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingBottom: 30,
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {cart.restaurant.name}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}>{`\u20B9 ${totalPrice}`}</Text>
        </View>
        {Object.keys(cart.items).map(id => (
          <CartItem error={error?.itemIds?.includes(id)} key={id} id={id} />
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderBody()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
});
