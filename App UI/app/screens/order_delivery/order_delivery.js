import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, icons, SIZES} from '../../constants';
import Map from './map';
import Icon from '../../components/icon';

const OrderDelivery = ({navigation, restaurant}) => {
  function renderMap() {
    return (
      <View style={{flex: 1, height: '100%', width: '100%'}}>
        <Map />
      </View>
    );
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Avatar */}
            {/* <Image
              source={restaurant?.courier.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25
              }}
            /> */}

            <View style={{flex: 1, marginLeft: SIZES.padding}}>
              {/* Name & Rating */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...FONTS.h4}}>dkajdak</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" color="#000" size={24} />
                  <Text style={{...FONTS.body3}}>56</Text>
                </View>
              </View>

              {/* Restaurant */}
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>kka</Text>
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDeliveryInfo()}
    </View>
  );
};

export default OrderDelivery;
