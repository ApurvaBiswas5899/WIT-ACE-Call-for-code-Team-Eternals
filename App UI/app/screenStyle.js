import {Platform, StyleSheet} from 'react-native';

const viewStyle = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 55,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#de2c47',
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 20,
  },
  buttonStyleBorder: {
    marginHorizontal: 55,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#de2c47',
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 20,
  },
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    borderColor: '#de2c47',
    borderRadius: 26,
    color: 'black',
  },

  pressableIOS: {
    ...({pressed}) =>
      Platform.select({
        ios: {
          opacity: pressed ? 0.2 : 1,
        },
        android: {
          opacity: 1,
        },
      }),
  },

  errorTextStyle: {
    marginHorizontal: 55,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
    color: '#a22',
  },

  textStyle: {
    // fontFamily:"SemiBold",
    marginHorizontal: 55,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.4,
  },

  headingStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    color: '#333',
  },

  buttonStyleCircle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 50,
    paddingHorizontal: 60,
  },

  button: {
    backgroundColor: '#de2c47',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
  },
});

export default viewStyle;
