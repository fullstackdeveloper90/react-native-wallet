import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight,
} from 'react-native';
import Header from './../../../../components/header';
import Colors from './../../../../config/colors';
import AuthService from './../../../../services/authService';
import { Input, Button } from './../../../../components/common';

class twoFactorSmsAuthScreen extends Component {
  static navigationOptions = {
    title: 'SMS',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      mobile_number: '',
      code: '+1',
      delete: params.authInfo.sms,
      authInfo: params.authInfo,
    };
  }

  sendSms = async () => {
    let responseJson = await AuthService.smsAuthPost({
      mobile_number: this.state.code + this.state.mobile_number,
    });
    if (responseJson.status === 'success') {
      const authInfo = responseJson.data;
      this.props.navigation.navigate('AuthVerifySms', { authInfo });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  changeCountryCode = (code, cca2) => {
    this.setState({
      code: '+' + code,
      countryName: cca2,
    });
  };

  deleteTwoFactorAuth = async () => {
    let responseJson = await AuthService.authOptionDelete();
    if (responseJson.status === 'success') {
      this.setState({
        mobile_number: '',
        delete: !this.state.delete,
      });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  async componentWillMount() {
    if (this.state.authInfo.sms === true) {
      let responseJson = await AuthService.smsAuthGet();
      if (responseJson.status === 'success') {
        const authInfo = responseJson.data;
        if (authInfo.confirmed === true) {
          this.setState({
            mobile_number: authInfo.mobile_number,
          });
        }
      } else {
        Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="SMS authentication"
        />
        <KeyboardAvoidingView style={styles.mainContainer} behavior={'padding'}>
          <View style={{ flex: 1 }}>
            <Input
              type="mobile"
              label="Enter valid mobile number"
              placeholder="123456789"
              autoCapitalize="none"
              value={this.state.mobile_number}
              onChangeText={mobile => this.setState({ mobile_number: mobile })}
              changeCountryCode={this.changeCountryCode}
              countryCode={this.state.code}
            />
          </View>

          <Button label="SAVE" onPress={() => this.sendSms()} />
          {this.state.delete && (
            <Button label="DELETE" onPress={() => this.deleteTwoFactorAuth()} />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  textInputText: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  mobileNoContainer: {
    backgroundColor: 'white',
  },
  buttonsContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColor: {
    color: 'white',
  },
});

export default twoFactorSmsAuthScreen;
