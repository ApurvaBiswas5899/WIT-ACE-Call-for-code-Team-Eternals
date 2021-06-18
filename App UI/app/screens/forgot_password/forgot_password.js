// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import StatusBar from 'expo-status-bar';
import {TextInput} from 'react-native-gesture-handler';
import {changeOpacity, isEmail} from '../../utils/helpers';
import Client from '../../client';
import GlobalStyles from '../screenStyle';

export default function ForgotPassword(props) {
  const RESEND_WAIT = 60;
  const EMAIL_MSG =
    'Please check Your email We have sent you a verification link.';
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [msg, setMsg] = useState(null);
  let {email} = props;

  const setTimerCallback = () => {
    setTimer(oldTimer => oldTimer - 1);
  };

  useEffect(
    () => () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
    [],
  );

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalId);
      setMsg(null);
    }
  }, [timer]);

  const sendEmailVerification = async () => {
    const result = await Client.sendVerificationEmail(email);
    return result;
  };

  const onResend = () => {
    if (!isEmail(email)) {
      setMsg('Please enter valid email');
      return;
    }
    setMsg(EMAIL_MSG);
    sendEmailVerification(email).then(result => {
      if (result.error) {
        setMsg(result.error);
      } else {
        setMsg(EMAIL_MSG);
      }
    });
    setTimer(RESEND_WAIT);
    setIntervalId(setInterval(setTimerCallback, 1000));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        {msg && <Text style={{...styles.text, marginBottom: 30}}> {msg}</Text>}
        <TextInput
          placeholder="Email"
          onChangeText={text => {
            email = text;
          }}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={false}
          disableFullscreenUI
          keyboardType="name-phone-pad"
          placeholderTextColor={changeOpacity('#fff', 0.5)}
          returnKeyType="next"
          style={GlobalStyles.inputBox}
          underlineColorAndroid="transparent"
        />
        {timer === 0 && (
          <Pressable
            style={[GlobalStyles.pressableIOS, styles.button]}
            android_ripple={{color: 'white'}}
            onPress={onResend}>
            <Text style={styles.loginOptions}>Resend</Text>
          </Pressable>
        )}
        {timer !== 0 && (
          <Text
            style={{
              color: '#fff',
              margin: 10,
            }}>{`00:${timer} to Send Email`}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 50,
  },
  text: {
    color: '#121212',
    fontSize: 16,
  },
  loginOptions: {
    color: 'white',
    // fontFamily: 'SemiBold',
  },
  button: {
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#de2c47',
    paddingVertical: 10,
    borderRadius: 23,
  },
});
