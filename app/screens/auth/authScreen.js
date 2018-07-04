import React, { Component } from 'react';
import Expo from 'expo';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  UIManager,
  LayoutManager,
  Text,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  hideModal,
  pinSuccess,
  pinFail,
  activateFingerprint,
  setPin,
  showModal,
  showFingerprintModal,
} from '../../redux/actions';

import Colors from './../../config/colors';
import {
  Button,
  FullScreenForm,
  Input,
  Spinner,
  PopUpGeneral,
  Slides,
  CodeInput,
} from './../../components/common';
import { standardizeString } from './../../util/general';

const SCREEN_WIDTH = Dimensions.get('window').width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AuthScreen extends Component {
  renderMainContainer() {
    const {
      loading,
      mainState,
      detailState,
      nextAuthFormState,
      temp_company,
      company,
      email,
      resetPassword,
      skip,
      company_config,
    } = this.props;

    const colors = company_config ? company_config.colors : Colors;

    let iconHeaderLeft = 'arrow-back';
    let onPressHeaderLeft = () => {
      this.props.previousAuthFormState(this.props);
    };

    let textHeaderRight = '';
    let onPressHeaderRight = () => {};

    let textFooterRight = 'Next';
    let onPressFooterRight = () => {
      nextAuthFormState('');
    };

    // set text / icons
    switch (mainState) {
      case 'company':
        iconHeaderLeft = '';
        break;
      case 'landing':
        textFooterRight = '';
        break;
      case 'forgot':
        textFooterRight = 'Send';
        onPressFooterRight = () => resetPassword(company, email);
        break;
      case 'login':
        textHeaderRight = 'Forgot?';
        onPressHeaderRight = () => nextAuthFormState('forgot');
        if (detailState === 'password') {
          textFooterRight = 'Log in';
        }
        break;
      case 'register':
        if (detailState === 'password') {
          textFooterRight = 'Register';
        }
        break;
      case 'pin':
        textFooterRight = '';
        if (detailState === 'pin' || 'fingerprint') {
          onPressHeaderLeft = () => this.props.navigation.navigate('Logout');
        } else {
          iconHeaderLeft = '';
        }
        break;
      case 'verification':
        iconHeaderLeft = '';
      default:
    }
    if (skip) {
      textHeaderRight = 'Skip';
      onPressHeaderRight = () => nextAuthFormState('skip');
    }

    return (
      <FullScreenForm
        iconHeaderLeft={iconHeaderLeft}
        onPressHeaderLeft={onPressHeaderLeft}
        textHeaderRight={textHeaderRight}
        onPressHeaderRight={onPressHeaderRight}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={loading}
        color={colors.primaryContrast}>
        {this.renderContent()}
      </FullScreenForm>
    );
  }

  renderContent() {
    const {
      viewStyleInput,
      buttonsContainer,
      viewStyleLanding,
      imageContainer,
      image,
      textStyle,
    } = styles;
    const {
      mainState,
      detailState,
      nextAuthFormState,
      company_config,
      pinError,
      authError,
      email,
    } = this.props;

    const colors = company_config ? company_config.colors : Colors;

    const slides = company_config ? company_config.sliders.landing : null;

    switch (mainState) {
      case 'landing':
        return (
          <View style={viewStyleLanding}>
            <Animatable.View style={imageContainer} animation="zoomInRight">
              {slides && slides.length > 0 ? (
                <Slides data={slides} height={200} width={SCREEN_WIDTH} />
              ) : (
                <Image
                  source={require('./../../../assets/icons/Rehive_icon_white.png')}
                  resizeMode="contain"
                  style={image}
                />
              )}
            </Animatable.View>
            <View style={buttonsContainer}>
              <Button
                label="LOG IN"
                textColor={colors.secondaryContrast}
                backgroundColor={colors.secondary}
                size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              />
              <Button
                label="Register"
                textColor={colors.primaryContrast}
                backgroundColor="transparent"
                // size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('register')}
                animation="fadeInUpBig"
              />
            </View>
          </View>
        );
      case 'forgot':
        return (
          <View style={viewStyleLanding}>
            <Text style={[textStyle, { color: colors.primaryContrast }]}>
              Instructions on how to reset your password will be sent to
            </Text>
            <View style={viewStyleInput}>{this.renderInput()}</View>
          </View>
        );
      case 'mfa':
        return (
          <View>
            {detailState === 'token' ? (
              <Text>Please enter token provided by your MFA app</Text>
            ) : (
              <Text>Please enter the OTP sent to your mobile number</Text>
            )}
            <Text>{pinError}</Text>
            <CodeInput
              ref={component => (this._pinInput = component)}
              secureTextEntry
              activeColor="gray"
              autoFocus
              inactiveColor="lightgray"
              className="border-b"
              codeLength={detailState === 'token' ? 6 : 4}
              space={7}
              size={30}
              inputPosition="center"
              containerStyle={{ marginTop: 0, paddingBottom: 24 }}
              onFulfill={code => this._onInputPinComplete(code)}
            />
            {/* <Button
              label="Resend SMS"
              textColor={company_config.colors.secondaryContrast}
              backgroundColor={company_config.colors.secondary}
              size="large"
              reference={input => {
                this.login = input;
              }}
              onPress={() => nextAuthFormState('login')}
              animation="fadeInUpBig"
            /> */}
          </View>
        );
      case 'pin':
        switch (detailState) {
          case 'pin':
            return (
              <View style={viewStyleLanding}>
                <Text style={[textStyle, { color: colors.primaryContrast }]}>
                  Please enter pin
                </Text>
                <Text style={[textStyle, { color: colors.error }]}>
                  {pinError}
                </Text>
                <CodeInput
                  ref={component => (this._pinInput = component)}
                  secureTextEntry
                  activeColor="gray"
                  autoFocus
                  inactiveColor="lightgray"
                  className="border-b"
                  codeLength={4}
                  space={7}
                  size={30}
                  inputPosition="center"
                  containerStyle={{ marginTop: 0, paddingBottom: 24 }}
                  onFulfill={code => this._onInputPinComplete(code)}
                />
              </View>
            );
          case 'fingerprint':
            this._scanFingerprint();
            return (
              <View style={viewStyleLanding}>
                <Text style={[textStyle, { color: colors.primaryContrast }]}>
                  Please scan fingerprint
                </Text>
              </View>
            );
          case 'set_pin':
          case 'confirm_pin':
            return (
              <View style={viewStyleLanding}>
                <Text style={[textStyle, { color: colors.primaryContrast }]}>
                  {detailState === 'set_pin'
                    ? 'Please enter pin'
                    : 'Please confirm pin'}
                </Text>
                <Text style={[textStyle, { color: colors.error }]}>
                  {authError}
                </Text>
                <CodeInput
                  ref={component => (this._pinInput = component)}
                  secureTextEntry
                  activeColor="gray"
                  autoFocus
                  inactiveColor="lightgray"
                  className="border-b"
                  codeLength={4}
                  space={7}
                  size={30}
                  inputPosition="center"
                  containerStyle={{ marginTop: 0, paddingBottom: 24 }}
                  onFulfill={code => this._onSetPinComplete(code)}
                />
              </View>
            );

          case 'set_fingerprint':
            return (
              <View style={viewStyleLanding}>
                <View style={buttonsContainer}>
                  <Button
                    label="SCAN FINGERPRINT"
                    textColor={company_config.colors.secondaryContrast}
                    backgroundColor={company_config.colors.secondary}
                    reference={input => {
                      this.login = input;
                    }}
                    onPress={() => this._activateFingerprint()}
                    animation="slideInRight"
                  />
                  <Button
                    label="USE PIN"
                    textColor={company_config.colors.primaryContrast}
                    backgroundColor="transparent"
                    reference={input => {
                      this.login = input;
                    }}
                    onPress={() => nextAuthFormState('pin')}
                    animation="slideInRight"
                  />
                </View>
              </View>
            );
        }
      case 'verification':
        switch (detailState) {
          case 'email':
            return (
              <View style={viewStyleLanding}>
                <Text style={[textStyle, { color: colors.primaryContrast }]}>
                  Please verify your email by following the instructions sent to{' '}
                  {email}
                </Text>
                {/* <Button
                label="Open email app"
                textColor={company_config.colors.secondaryContrast}
                backgroundColor={company_config.colors.secondary}
                size="large"
                reference={input => {
                  this.login = input;
                }}
                onPress={() => nextAuthFormState('login')}
                animation="fadeInUpBig"
              /> */}
                {/* <Button
                  label="Resend email"
                  textColor={company_config.colors.primaryContrast}
                  backgroundColor="transparent"
                  // size="large"
                  reference={input => {
                    this.login = input;
                  }}
                  onPress={() => nextAuthFormState('register')}
                  animation="fadeInUpBig"
                /> */}
              </View>
            );
        }
      default:
        return <View style={viewStyleInput}>{this.renderInput()}</View>;
    }
  }

  _onInputPinComplete(code) {
    const { pin } = this.props;
    if (pin === code) {
      this.props.pinSuccess();
    } else {
      this._pinInput.clear();
      this.props.pinFail('Pin incorrect, please try again');
    }
  }

  _onSetPinComplete(code) {
    if (!this.props.code) {
      this.props.authFieldChange({ prop: 'code', value: code });
      this._pinInput.clear();
    } else if (this.props.code === code) {
      this.props.setPin(code);
    } else {
      this._pinInput.clear();
      this.props.authFieldChange({ prop: 'code', value: '' });
    }
    this.props.nextAuthFormState();
  }

  _scanFingerprint = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger');
    if (result.success) {
      this.props.pinSuccess();
    } else {
      this.props.pinFail('Unable to authenticate with fingerprint');
    }
  };

  _activateFingerprint = async () => {
    if (Platform.OS !== 'ios') {
      await Expo.Fingerprint.cancelAuthenticate();
      this.props.showFingerprintModal();
    }
    if (await Expo.Fingerprint.authenticateAsync()) {
      this.props.activateFingerprint();
    }
  };

  renderInput() {
    const {
      detailState,
      authError,
      company,
      tempCompany,
      email,
      mobile,
      password,
      first_name,
      last_name,
      country,
      company_config,
    } = this.props;

    const colors = company_config ? company_config.colors : Colors;

    let key = detailState;
    let type = detailState;
    let placeholder = '';
    let label = standardizeString(detailState);
    let value = '';
    let onChangeText = value =>
      this.props.authFieldChange({ prop: detailState, value });
    let returnKeyType = 'done';
    let onSubmitEditing = () => this.props.nextAuthFormState('');
    let keyboardType = 'default';

    switch (detailState) {
      case 'company':
        placeholder = 'e.g. Rehive';
        value = tempCompany;
        onChangeText = value =>
          this.props.authFieldChange({ prop: 'tempCompany', value });
        break;
      case 'email':
        value = email;
        placeholder = 'e.g. user@gmail.com';
        keyboardType = 'email-address';
        break;
      case 'mobile':
        value = mobile;
        placeholder = '12345678';
        keyboardType = 'numeric';
        break;
      case 'password':
        value = password;
        placeholder = 'Password';
        break;
      case 'first_name':
        value = first_name;
        placeholder = 'John';
        break;
      case 'last_name':
        value = last_name;
        placeholder = 'Snow';
        break;
      case 'country':
        value = country;
        placeholder = 'Password';
        break;
    }
    return (
      <Input
        key={key}
        type={type}
        placeholder={placeholder}
        label={label}
        value={value}
        inputError={authError}
        // autoFocus
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        colors={colors}
      />
    );
  }

  renderModal() {
    const {
      modalVisible,
      modalType,
      hideModal,
      resetAuth,
      loading,
      email,
      authError,
    } = this.props;
    // console.log(this.props);

    let contentText = '';
    let textActionOne = 'OK';
    let onPressActionOne = hideModal;
    let content = null;
    switch (modalType) {
      case 'loginError':
        contentText = 'Unable to log in with provided credentials';
        break;
      case 'forgot':
        contentText =
          'Instructions on how to reset your password have been sent to ' +
          email;
        onPressActionOne = resetAuth;
        break;
      case 'fingerprint':
        contentText = 'Please scan your fingerprint';
        onPressActionOne = () => {
          if (Platform.os !== 'ios') {
            Expo.Fingerprint.cancelAuthenticate();
          }
          hideModal;
        };
        break;
    }

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={textActionOne}
        onPressActionOne={onPressActionOne}
        onDismiss={onPressActionOne}
        // loading={loading}
        // errorText={updateError}
      />
    );
  }

  render() {
    const { loading, appLoading, postLoading } = this.props;
    const { viewStyleContainer } = styles;

    return (
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'never'}
        style={viewStyleContainer}
        behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {loading || postLoading ? (
            <Spinner size="large" />
          ) : (
            this.renderMainContainer()
          )}
        </TouchableWithoutFeedback>
        {this.renderModal()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: Expo.Constants.statusBarHeight,
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '100%',
    padding: 16,
  },
  viewStyleLanding: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
  },
  viewStyleInput: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 150,
    height: 70,
  },
  imageSmall: {
    maxWidth: 250,
    height: 50,
  },
  textStyle: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16,
    fontSize: 18,
  },
  textContainerTerms: {
    paddingHorizontal: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTerms: {
    fontSize: 12,
    color: Colors.primary,
  },
};

const mapStateToProps = ({ auth, user }) => {
  const {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    authError,
    email,
    emailError,
    mobile,
    mobileError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
    pin,
    fingerprint,
    pinError,
    skip,
    company_config,
    postLoading,
    code,
  } = auth;
  return {
    detailState,
    countryCode,
    mainState,
    tempCompany,
    company,
    authError,
    email,
    emailError,
    mobile,
    mobileError,
    password,
    passwordError,
    loading,
    token,
    appLoading,
    modalVisible,
    modalType,
    company_config,
    pin,
    fingerprint,
    pinError,
    skip,
    postLoading,
    code,
  };
};

export default connect(mapStateToProps, {
  authFieldChange,
  nextAuthFormState,
  previousAuthFormState,
  resetPassword,
  resetAuth,
  showModal,
  hideModal,
  pinSuccess,
  pinFail,
  activateFingerprint,
  showFingerprintModal,
  setPin,
})(AuthScreen);
