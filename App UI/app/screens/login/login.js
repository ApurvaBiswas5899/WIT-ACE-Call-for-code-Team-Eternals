/* eslint-disable react/prefer-stateless-function */
import React, {PureComponent} from 'react';
import {Text, View, Image, Pressable, SafeAreaView} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import viewStyle from '../../screenStyle';
import {COLORS} from '../../constants';
import ProcessButton from '../../components/proceed_button';
import {isEmail} from '../../utils/helpers';

export default class Login extends PureComponent {
  constructor() {
    super();

    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();
    this.email = '';
    this.password = '';

    this.state = {
      isloading: false,
      error: '',
    };
  }

  onPasswordChange = text => {
    this.password = text;
  };

  onEmailChange = text => {
    this.email = text;
  };

  onLogin = () => {
    this.setState({
      isloading: true,
    });

    const {navigation, actions} = this.props;
    if (!isEmail(this.email)) {
      this.setState({
        error: 'Please Enter Valid Email',
        isloading: false,
      });
      return;
    }
    if (this.password === '') {
      this.setState({
        error: 'Please enter the password',
        isloading: false,
      });
      return;
    }
    actions.loginUser(this.email, this.password).then(result => {
      if (result?.success) {
        navigation.navigate('Home');
      } else {
        this.setState({
          error: result.error,
        });
      }
      this.setState({
        isloading: false,
      });
    });
  };

  render() {
    const {navigation, actions} = this.props;
    const {navigate} = navigation;
    const {error, isloading} = this.state;

    const button = (
      <Pressable
        style={[viewStyle.pressableIOS, viewStyle.buttonStyle]}
        android_ripple={{color: 'white'}}
        onPress={this.onLogin}>
        <Text style={styles.loginOptions}>Login</Text>
      </Pressable>
    );

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/login.png')}
              resizeMode="contain"
              style={{height: 250, width: 400}}
            />
            <Text style={viewStyle.headingStyle}>burpp it!!</Text>

            <Text style={styles.centerContainer}>Already a member?</Text>

            {error ? (
              <Text style={viewStyle.errorTextStyle}>{error}</Text>
            ) : null}

            <View style={viewStyle.inputStyle}>
              <TextInput
                ref={this.inputEmail}
                placeholder="Email"
                onChangeText={this.onEmailChange}
                placeholderTextColor="#ea4e50"
                style={styles.input}
              />
            </View>

            <View style={viewStyle.inputStyle}>
              <TextInput
                ref={this.inputPassword}
                secureTextEntry
                onChangeText={this.onPasswordChange}
                placeholder="Password"
                placeholderTextColor="#ea4e50"
                style={styles.input}
              />
            </View>

            <ProcessButton observe={isloading} button={button} />
            <Pressable
              style={[viewStyle.pressableIOS, viewStyle.buttonStyle]}
              android_ripple={{color: 'white'}}
              onPress={() => navigate('Register')}>
              <Text style={{color: 'white'}}>Register</Text>
            </Pressable>
            <Pressable
              style={[viewStyle.pressableIOS, viewStyle.buttonStyleBorder]}
              android_ripple={{color: 'white'}}
              onPress={() => navigate('Verification')}>
              <Text style={{color: COLORS.primary}}>Verify Email</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  errorText: {
    color: '#000',
  },
  centerContainer: {
    marginHorizontal: 55,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  input: {paddingHorizontal: 10, flex: 1},
  button: {
    marginHorizontal: 55,
    marginTop: 30,
    backgroundColor: '#de2c47',
    paddingVertical: 10,
    borderRadius: 23,
  },
  loginOptions: {
    color: 'white',
  },
  register: {
    marginHorizontal: 55,
    marginTop: 30,
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 23,
  },
};
