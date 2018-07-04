import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  authFieldChange,
  changePassword,
  hideModal,
} from '../../../redux/actions';
import {
  Input,
  InputContainer,
  Button,
  PopUpGeneral,
} from './../../../components/common';
import Header from './../../../components/header';

class ChangePasswordScreen extends Component {
  static navigationOptions = {
    label: 'Change password',
  };

  renderModal() {
    const { modalVisible, hideModal } = this.props;

    if (modalVisible) {
      if (modalVisible && !inputError) {
        modalText = 'Password updated';
        modalAction = () => this.props.navigation.goBack();
      } else {
        modalText = 'Error: ' + inputError;
        modalAction = () => hideModal;
      }
      return (
        <PopUpGeneral
          visible={modalVisible}
          contentText={modalText}
          textActionOne={'Close'}
          onPressActionOne={modalAction}
          onDismiss={modalAction}
        />
      );
    }
    return null;
  }

  render() {
    const {
      new_password,
      old_password,
      authFieldChange,
      changePassword,
      old_passwordError,
      new_passwordError,
      company_config,
    } = this.props;
    const { colors } = company_config;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Change password"
        />
        <InputContainer>
          <Input
            type="password"
            label="Old password"
            // placeholder="password"
            autoCapitalize="none"
            value={old_password}
            inputError={old_passwordError}
            onChangeText={value =>
              authFieldChange({ prop: 'old_password', value })
            }
            colors={colors}
          />
          <Input
            type="password"
            label="New password"
            autoCapitalize="none"
            // placeholder="e.g. 123dr!21"
            value={new_password}
            inputError={new_passwordError}
            onChangeText={value =>
              authFieldChange({ prop: 'new_password', value })
            }
            colors={colors}
          />

          <Button
            label="CONFIRM"
            // type="contained"
            onPress={() => changePassword(old_password, new_password)}
          />
          {this.renderModal()}
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
};

const mapStateToProps = ({ auth }) => {
  const {
    input,
    inputError,
    old_password,
    new_password,
    old_passwordError,
    new_passwordError,
    loading,
    company_config,
  } = auth;
  return {
    input,
    inputError,
    old_password,
    new_password,
    old_passwordError,
    new_passwordError,
    loading,
    company_config,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  changePassword,
  hideModal,
})(ChangePasswordScreen);
