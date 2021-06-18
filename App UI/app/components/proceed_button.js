import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';

export default function ProcessButton(props) {
  if (props.observe) {
    return (
      <ActivityIndicator
        style={{margin: 15}}
        size="large"
        color={COLORS.primary}
      />
    );
  }
  return props.button;
}
