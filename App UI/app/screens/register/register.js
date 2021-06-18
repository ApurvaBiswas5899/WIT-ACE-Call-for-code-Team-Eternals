import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../constants';
import viewStyle from '../../screenStyle';
import ProcessButton from '../../components/proceed_button';
import {isEmail} from '../../utils/helpers';

export default class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.email = '';
    this.password = '';
    this.name = '';
    this.lastname = '';
    this.image = '';
    this.confirmPassword = '';
    this.state = {
      isloading: false,
      error: '',
    };
  }

  onRegister = async () => {
    const {actions, navigation} = this.props;
    if (this.name.length === 0) {
      this.setState({
        error: 'Please enter your first name',
      });
      return;
    }
    if (this.lastname.length === 0) {
      this.setState({
        error: 'Please enter your first lastname',
      });
      return;
    }
    if (!isEmail(this.email)) {
      this.setState({
        error: 'Please enter valid email',
      });
      return;
    }
    if (this.password.length < 8) {
      this.setState({
        error: 'Please enter a better password',
      });
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.setState({
        error: "Passwords dosen't match",
      });
      return;
    }
    this.setState({
      isloading: true,
    });
    const result = await actions.registerUser();
    if (!result?.success) {
      this.setState({
        isloading: false,
        error: result.message,
      });
    }
    if (result?.success) {
      navigation.navigate('Verification', {email: this.email});
    }
  };

  render() {
    const {error, isloading} = this.state;
    const button = (
      <Pressable
        style={[viewStyle.pressableIOS, styles.button]}
        android_ripple={{color: 'white'}}
        onPress={this.onRegister}>
        <Text style={styles.loginOptions}>Signup</Text>
      </Pressable>
    );
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingBottom: 20}}>
            <Image
              source={require('../../assets/images/login.png')}
              resizeMode="contain"
              style={{height: 250, width: 400}}
            />
            <Text style={viewStyle.headingStyle}>burpp it!!</Text>

            {error ? (
              <Text style={viewStyle.errorTextStyle}>{error}</Text>
            ) : null}

            <View style={viewStyle.inputStyle}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#ea4e50"
                onChangeText={text => {
                  this.name = text;
                }}
                style={styles.input}
              />
            </View>
            <View style={viewStyle.inputStyle}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#ea4e50"
                onChangeText={text => {
                  this.lastname = text;
                }}
                style={styles.input}
              />
            </View>
            <View style={viewStyle.inputStyle}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#ea4e50"
                onChangeText={text => {
                  this.email = text;
                }}
                style={styles.input}
              />
            </View>
            <View style={viewStyle.inputStyle}>
              <TextInput
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#ea4e50"
                onChangeText={text => {
                  this.password = text;
                }}
                style={styles.input}
              />
            </View>
            <View style={viewStyle.inputStyle}>
              <TextInput
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor="#ea4e50"
                onChangeText={text => {
                  this.confirmPassword = text;
                }}
                style={styles.input}
              />
            </View>
            <ProcessButton observe={isloading} button={button} />
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
    // fontFamily: 'SemiBold',
    marginHorizontal: 55,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    opacity: 0.4,
  },
  input: {paddingHorizontal: 10, flex: 1},
  button: {
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#de2c47',
    paddingVertical: 10,
    borderRadius: 23,
  },
  loginOptions: {
    color: 'white',
    // fontFamily: 'SemiBold',
  },
  register: {
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 23,
  },
};
