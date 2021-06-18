// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {changeOpacity, isEmail} from '../../utils/helpers';
import Client from '../../client';
import GlobalStyles from '../../screenStyle';

export default function Verification(props) {
  const RESEND_WAIT = 60;
  const EMAIL_MSG =
    'Please check Your email We have sent you a verification link.';
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const EMAIL_ENTER = 'Please enter email to recieve verification link';
  const [msg, setMsg] = useState(props.email ? EMAIL_ENTER : EMAIL_MSG);
  let {email} = props;

  const onContinue = () => {
    props.navigator.navigate('Login');
  };

  const setTimerCallback = () => {
    setTimer(oldTimer => oldTimer - 1);
  };

  useEffect(() => {
    if (props.email) {
      setTimer(RESEND_WAIT);
      setIntervalId(setInterval(setTimerCallback, 1000));
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalId);
      setMsg(EMAIL_ENTER);
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
      if (result?.error) {
        setMsg(result?.error || '');
      } else {
        setMsg(EMAIL_MSG);
      }
    });
    setTimer(RESEND_WAIT);
    setIntervalId(setInterval(setTimerCallback, 1000));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={GlobalStyles.headingStyle}>Verification</Text>
      <View style={styles.innerContainer}>
        {msg && msg !== '' && (
          <Text style={{...styles.text, marginBottom: 30}}>{`${msg}`}</Text>
        )}
        <View style={GlobalStyles.inputStyle}>
          <TextInput
            placeholder="Email"
            onChangeText={text => {
              email = text;
            }}
            editable={!props.email}
            placeholderTextColor="#ea4e50"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            disableFullscreenUI
            keyboardType="name-phone-pad"
            returnKeyType="next"
            style={GlobalStyles.inputBox}
            underlineColorAndroid="transparent"
          />
        </View>
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
              color: 'black',
              margin: 10,
            }}>{`00:${timer} to Resend Email`}</Text>
        )}
        {props.email && (
          <Pressable
            style={[GlobalStyles.pressableIOS, styles.button]}
            android_ripple={{color: 'white'}}
            onPress={onContinue}>
            <Text style={styles.loginOptions}>Continue</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 50,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  loginOptions: {
    color: 'white',
    // fontFamily: 'SemiBold',
  },
  button: {
    marginHorizontal: 55,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#de2c47',
    paddingVertical: 10,
    borderRadius: 23,
  },
});
