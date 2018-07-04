/* PIN INPUT */
/*
Component that request the user to input a pin if pin has been set or 
to scan fingerprint if fingerprint has been set.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CodeInput, PopUpGeneral } from './common';

class PinModal extends Component {
  state = { contentText: '', errorText: '' };
  componentDidMount() {
    const { pin, fingerprint, onSuccess } = this.props;

    // let compatible = await this.checkDeviceForHardware();
    // let fingerprints = await this.checkForFingerprints();

    let contentText = '';
    let errorText = '';

    if (fingerprint) {
      // if (!compatible) {
      //   errorText =
      //     'Unable to access devices fingerprint scanner. Please log out to reset fingerprint.';
      // } else if (!fingerprints) {
      //   errorText =
      //     'Unable to access devices stored fingerprints. Please log out to reset fingerprint.';
      // } else {
      contentText = 'Please scan your fingerprint to proceed';
      this.scanFingerprint();
      // }
    } else if (pin) {
      contentText = 'Please input your pin to proceed';
    } else {
      onSuccess();
    }

    this.setState({ errorText, contentText });
  }

  checkDeviceForHardware = async () => {
    let compatible = await Expo.Fingerprint.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await Expo.Fingerprint.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result.success) {
      console.log('success');
      this.props.onSuccess();
    } else {
      this.setState({ errorText: 'Unable to authenticate with fingerprint' });
    }
  };

  _onInputPinComplete(code) {
    const { pin, fingerprint, modalVisible, onSuccess, onDismiss } = this.props;
    let errorText = '';
    if (pin === code) {
      onSuccess();
    } else {
      this._pinInput.clear();
      errorText = 'Incorrect pin, please try again';
    }
    this.setState({ errorText });
  }

  render() {
    const { pin, fingerprint, modalVisible, onSuccess, onDismiss } = this.props;

    const { errorText, contentText } = this.state;

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={contentText}
        textActionOne={'CANCEL'}
        onPressActionOne={onDismiss}
        errorText={errorText}
        onDismiss={onDismiss}>
        {pin ? (
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
        ) : null}
      </PopUpGeneral>
    );
  }
}

PinModal.propTypes = {
  pin: PropTypes.string, // Required pin
  fingerprint: PropTypes.bool, // Required fingerprint
  modalVisible: PropTypes.bool, // Required fingerprint
  onSuccess: PropTypes.func, // Function if pin/fingerprint success
  onDismiss: PropTypes.func, // Function to execute on dismiss
};

PinModal.defaultProps = {
  pin: '',
  fingerprint: false,
  modalVisible: false,
  onSuccess: () => {},
  onDismiss: () => {},
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingRight: 8,
    paddingLeft: 4,
    justifyContent: 'flex-start',
  },
};

export default PinModal;
