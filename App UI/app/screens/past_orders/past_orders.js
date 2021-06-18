import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Text,
  Alert,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from '../../components/icon';
import PastOrder from '../../components/past_order/index';
import {FONTS, SIZES} from '../../constants';

export default function PastOrders({navigation, actions, pastOrdersIds}) {
  useEffect(() => {
    if (isLoading) {
      actions.getPastOrders();
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({item}) => <PastOrder id={item} />;

  const refreshView = (
    <RefreshControl
      onRefresh={() => {
        setIsLoading(true);
      }}
      refreshing={isLoading}
    />
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
            borderRadius: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3}}>Past Orders</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={pastOrdersIds}
        refreshing={isLoading}
        keyExtractor={item => `${item}`}
        renderItem={renderItem}
        refreshControl={refreshView}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
