import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import GlobalStyles from '../../screenStyle';

import PendingOrder from '../../components/pending_order/index';

import {COLORS} from '../../constants';
import Icon from '../../components/icon';

const Profile = ({actions, navigation, profile, pendingOrdersIds}) => {
  useEffect(() => {
    actions.getPastOrders();
  }, []);
  const onLogout = () => {
    navigation.navigate('Login');
    actions.logout();
  };
  function renderHeader() {
    return (
      <View
        style={{
          paddingVertical: 20,
          paddingEnd: 30,
          paddingStart: 20,
          backgroundColor: '#F5F5F5',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name="user" color="grey" size={32} style={{padding: 10}} />
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 30,
              flexWrap: 'wrap',
              paddingHorizontal: 10,
            }}>
            {`${profile.name} ${profile.lastname}`}
          </Text>

          <Text
            style={{
              fontSize: 16,
              flexWrap: 'wrap',
              paddingHorizontal: 10,
            }}>
            {profile.email}
          </Text>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View
        style={{
          padding: 10,
          alignItems: 'flex-start',
        }}>
        <Pressable
          android_ripple={{color: 'gray'}}
          style={[GlobalStyles.pressableIOS, styles.button]}
          onPress={() => {
            navigation.navigate('PastOrders');
          }}>
          <Text style={styles.options}> Past Orders </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: 'gray'}}
          onPress={onLogout}
          style={[GlobalStyles.pressableIOS, styles.button]}>
          <Text style={styles.options}> Logout </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: 'gray'}}
          style={[GlobalStyles.pressableIOS, styles.button]}>
          <Text style={styles.options}> About Us </Text>
        </Pressable>
      </View>
    );
  }

  function renderPickup() {
    return (
      <View
        style={{
          paddingBottom: 50,
        }}>
        {pendingOrdersIds.length === 0 && <Text>No Pending Orders</Text>}
        {pendingOrdersIds.map(id => (
          <PendingOrder key={id} id={id} />
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderButton()}
      <View style={{height:1, marginHorizontal:10, backgroundColor:'black'}}/>
      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 16}}>
        Pickup Pending
      </Text>
      <ScrollView style={{flex: 1}}>{renderPickup()}</ScrollView>
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
  button: {
    alignSelf: 'stretch',
  },
  options: {color: 'black', fontSize: 18, margin: 10},
  icon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Profile;
