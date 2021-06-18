import React from 'react';
import {TouchableWithoutFeedback, View, Image, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import Icon from '../icon';

export default function Category(props) {
  return (
    <TouchableWithoutFeedback
      style={{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor:
          selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        ...styles.shadow,
      }}
      onPress={() => onSelectCategory(item)}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
        }}>
        <Icon name="location" color="#000" size={24} />
      </View>

      <Text
        style={{
          marginTop: SIZES.padding,
          color: selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
          ...FONTS.body5,
        }}>
        {item.name}
      </Text>
    </TouchableWithoutFeedback>
  );
}
