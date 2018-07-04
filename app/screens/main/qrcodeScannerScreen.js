import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Header from './../../components/header';
import { connect } from 'react-redux';
import {
  resetSend,
  setSendWallet,
  sendFieldUpdate,
} from './../../redux/actions';

import { Output, Button } from './../../components/common';

class QRCodeScannerScreen extends Component {
  static navigationOptions = {
    title: 'QR code scanner',
  };

  state = {
    camera: true,
    reference: '',
    data: {
      amount: '',
      recipient: '',
      note: '',
    },
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  accept = () => {
    const { amount, recipient, note } = this.state.data;
    this.props.resetSend();
    // this.props.setSendWallet(this.props.wallets[this.props.activeWalletIndex]);
    this.props.sendFieldUpdate({ prop: 'sendAmount', value: amount });
    this.props.sendFieldUpdate({ prop: 'sendRecipient', value: recipient });
    this.props.sendFieldUpdate({ prop: 'sendNote', value: note });
    this.props.navigation.goBack();
    // this.props.navigation.navigate('Send');
  };

  _handleBarCodeRead = data => {
    let dataJSON = JSON.parse(data.data);
    this.setState({ camera: false, data: dataJSON });
  };

  render() {
    const { hasCameraPermission, data } = this.state;
    const { amount, recipient, note } = data;
    const { viewStyleConfirm } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="QR code scanner"
        />
        {hasCameraPermission ? (
          this.state.camera ? (
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ flex: 1 }}
            />
          ) : (
            <View style={viewStyleConfirm}>
              {amount ? <Output label="Amount" value={amount} /> : null}
              {recipient ? (
                <Output label="Recipient" value={recipient} />
              ) : null}
              {note ? <Output label="Note" value={note} /> : null}

              <Button label="Accept" onPress={this.accept} />
              <Button
                label="Scan again"
                onPress={() => this.setState({ camera: true })}
              />
            </View>
          )
        ) : (
          <Text>No access to camera</Text>
        )}
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
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleConfirm: {
    padding: 16,
  },
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {
  resetSend,
  setSendWallet,
  sendFieldUpdate,
})(QRCodeScannerScreen);
