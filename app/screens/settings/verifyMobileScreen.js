import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import SettingsService from './../../services/settingsService';
import ResetNavigation from './../../util/resetNavigation';
import { Input, InputContainer, Button } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';

class VerifyMobileScreen extends Component {
  static navigationOptions = {
    title: 'Verify mobile number',
  };

  constructor(props) {
    super(props);
    this.state = {
      routeName: this.props.navigation.state.params.routeName,
      otp: '',
    };
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(
      this.props.navigation,
      this.state.routeName != null ? 'GetVerified' : 'Settings',
      'SettingsMobileNumbers',
    );
  };

  verify = async () => {
    let responseJson = await SettingsService.verifyMobile({
      otp: this.state.otp,
    });

    if (responseJson.status === 'success') {
      this.reload();
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Verify mobile number"
        />
        <InputContainer>
          <Input
            label="Enter OTP"
            placeholder="OTP"
            autoCapitalize="none"
            keyboardType="numeric"
            underlineColorAndroid="white"
            onChangeText={otp => this.setState({ otp })}
          />
          <View style={{ justifyContent: 'center' }}>
            <Button
              label="VERIFY"
              type="primary"
              reference={input => {
                this.login = input;
              }}
              onPress={this.verify}
            />
            <Button
              label="SKIP"
              type="secondary"
              reference={input => {
                this.login = input;
              }}
              onPress={() => this.reload()}
            />
          </View>
        </InputContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submit: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: Colors.lightblue,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttons: {
    height: 65,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
};

export default VerifyMobileScreen;
