import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {} from './../../redux/actions';
import Header from './../../components/header';
import AppConfig from './../../../app.json';
// import HeaderVerified from './../../../components/HeaderVerified';

import {
  SettingsContainer,
  SettingsOption,
  InputContainer,
} from './../../components/common';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  goTo = (path, name) => {
    this.props.navigation.navigate(path, { name });
  };

  renderBasicInfo() {
    const { profile } = this.props;

    let value =
      (profile.first_name ? profile.first_name : '') +
      (profile.last_name ? ' ' + profile.last_name : '');

    return (
      <SettingsOption
        label="Basic info"
        value={value}
        gotoAddress="SettingsPersonalDetails"
        onPress={this.goTo}
      />
    );
  }

  renderEmailAddresses() {
    const { email } = this.props;

    let value = 'Not yet provided';

    if (email) {
      for (let i = 0; i < email.length; i++) {
        if (email[i].verified === true) {
          value = email[i].email;
        }
        if (email[i].primary === true) {
          value = email[i].email;
          break;
        }
      }
    }

    return (
      <SettingsOption
        label="Email address"
        value={value}
        gotoAddress="SettingsEmailAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderMobileNumbers() {
    const { mobile } = this.props;

    let value = 'Not yet provided';

    if (mobile) {
      for (let i = 0; i < mobile.length; i++) {
        if (mobile[i].verified) {
          value = mobile[i].number;
        }
        if (mobile[i].primary) {
          value = mobile[i].number;
          break;
        }
      }
    }

    return (
      <SettingsOption
        label="Mobile number"
        value={value}
        gotoAddress="SettingsMobileNumbers"
        onPress={this.goTo}
      />
    );
  }

  renderAddresses() {
    const { address } = this.props;

    let value = '';
    if (address) {
      if (address.line_1) {
        value = value + address.line_1 + ', ';
      }
      if (address.line_2) {
        value = value + address.line_2 + ', ';
      }
      if (address.city) {
        value = value + address.city + ', ';
      }
      if (address.state_province) {
        value = value + address.state_province + ', ';
      }
      if (address.country) {
        value = value + address.country + ', ';
      }
      if (address.postal_code) {
        value = value + address.postal_code;
      }
    }
    if (!value) {
      value = 'Not yet provided';
    }

    return (
      <SettingsOption
        label="Address"
        value={value}
        gotoAddress="SettingsAddress"
        onPress={this.goTo}
      />
    );
  }

  renderDocuments() {
    return (
      <View>
        <SettingsOption
          label="Proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Advanced proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Proof of address"
          gotoAddress="Document"
          onPress={this.goTo}
        />
      </View>
    );
  }

  renderBankAccounts() {
    return (
      <SettingsOption
        label="Bank accounts"
        gotoAddress="SettingsBankAccounts"
        onPress={this.goTo}
      />
    );
  }

  renderCards() {
    return (
      <SettingsOption
        label="Cards"
        gotoAddress="SettingsCards"
        onPress={this.goTo}
      />
    );
  }

  renderCryptoAccounts() {
    return (
      <SettingsOption
        label="Crypto accounts"
        gotoAddress="SettingsCryptoAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderSecurity() {
    return (
      <View>
        <SettingsOption
          label="Change password"
          gotoAddress="ChangePassword"
          onPress={this.goTo}
        />
        {/* <SettingsOption
          label="Two factor"
          gotoAddress="TwoFactor"
          onPress={this.goTo}
        /> */}
        <SettingsOption
          label="Pin/fingerprint"
          gotoAddress="Pin"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Log out"
          gotoAddress="Logout"
          onPress={this.goTo}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Settings" />
        <InputContainer>
          <SettingsContainer label="Personal details">
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
          </SettingsContainer>
          <SettingsContainer label="External accounts">
            {this.renderBankAccounts()}
            {/* {this.renderCards()} */}
            {/* {this.renderCryptoAccounts()} */}
          </SettingsContainer>
          <SettingsContainer label="Security">
            {this.renderSecurity()}
          </SettingsContainer>
        </InputContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // mainContainer: {
  //   flex: 1,
  // },
};

const mapStateToProps = ({ user }) => {
  const { profile, address, mobile, email } = user;
  return {
    profile,
    address,
    mobile,
    email,
  };
};

export default connect(mapStateToProps, {})(SettingsScreen);
