import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Text,
  ListView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setSendWallet,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  updateAccountField,
  send,
} from '../../redux/actions';

import { Input, FullScreenForm, Output } from './../../components/common';
import ContactService from './../../services/contactService';
import Colors from './../../config/colors';
import Header from './../../components/header';
import PinModal from './../../components/PinModal';
import { performDivisibility } from './../../util/general';

class SendScreen extends Component {
  static navigationOptions = () => ({
    title: 'Send',
  });

  state = {
    input: '',
    balance: 0,
    ready: false,
    refreshing: false,
    reference: '',
    searchText: '',
    data: [],
    contacts: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),

    showContacts: false,
    contactButtonText: 'Show contacts',

    pinVisible: false,
  };

  componentDidMount() {
    if (this.props.sendWallet === null) {
      this.props.setSendWallet(wallets[activeWalletIndex]);
    }
  }

  showContactsAsync = async () => {
    //await AsyncStorage.removeItem('contacts')
    if (this.state.ready === false) {
      let contacts = await AsyncStorage.getItem('contacts');
      if (contacts) {
        let data = JSON.parse(contacts);
        this.setState({
          ready: true,
          data,
          contacts: this.state.contacts.cloneWithRows(data),
        });
      } else {
        this.refreshContactsAsync();
      }
    } else {
      this.setState({ refreshing: true });
      this.refreshContactsAsync();
    }
  };

  refreshContactsAsync = async () => {
    let data = await ContactService.getAllContacts();
    this.setState({
      refreshing: false,
      ready: true,
      data,
      contacts: this.state.contacts.cloneWithRows(data),
    });

    await AsyncStorage.removeItem('contacts');
    await AsyncStorage.setItem('contacts', JSON.stringify(data));
  };

  selectAContact = contact => {
    this.setState({ searchText: contact });
  };

  searchTextChanged = event => {
    let searchText = event.nativeEvent.text;
    this.setState({ searchText });

    if (searchText === '') {
      this.setState({
        contacts: this.state.contacts.cloneWithRows(this.state.data),
      });
      return;
    }

    let contacts = this.state.data.filter(node => {
      if (typeof node.name == 'undefined') {
        return false;
      }
      let name = node.name.toLowerCase();
      if (typeof node.contact == 'undefined') {
        return false;
      }
      if (name.indexOf(searchText) !== -1) {
        return true;
      } else if (node.contact.indexOf(searchText) !== -1) {
        return true;
      }

      return false;
    });

    this.setState({
      contacts: this.state.contacts.cloneWithRows(contacts),
    });
  };

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRcodeScanner');
  };

  toggleContacts() {
    if (this.state.showContacts) {
      this.setState({
        showContacts: false,
        contactButtonText: 'Show contacts',
      });
    } else {
      this.setState({
        showContacts: true,
        contactButtonText: 'Hide contacts',
      });
    }
  }

  performSend() {
    const { sendWallet, sendAmount, sendRecipient, sendNote } = this.props;

    let data = {
      amount: sendAmount,
      recipient: sendRecipient,
      note: sendNote,
      currency: sendWallet.currency.currency,
      reference: sendWallet.account_reference,
    };
    this.props.send(data);
  }

  renderMainContainer() {
    const {
      sending,
      sendState,
      sendWallet,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      sendAmount,
      sendRecipient,
      sendNote,
      sendError,
      setSendState,
    } = this.props;

    const { viewStyleBottomContainer } = styles;

    let textFooterRight = 'Next';
    let textFooterLeft = '';
    let onPressFooterRight = () => {};
    let onPressFooterLeft = () => {};

    switch (sendState) {
      case 'amount':
        onPressFooterRight = () => validateSendAmount(sendWallet, sendAmount);
        break;
      case 'recipient':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        onPressFooterRight = () => validateSendRecipient(sendRecipient);
        break;
      case 'note':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        onPressFooterRight = () => validateSendNote(sendNote);
        break;
      case 'confirm':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setSendState('amount');
        textFooterRight = 'Confirm';
        onPressFooterRight = () => this.setState({ pinVisible: true });
        break;
      case 'success':
        // textFooterLeft = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
      case 'fail':
        // textFooterLeft = 'Close';
        textFooterRight = 'Close';
        onPressFooterRight = () => this.props.navigation.goBack();
        break;
    }

    return (
      <FullScreenForm
        // textFooterLeft={textFooterLeft}
        // onPressFooterLeft={onPressFooterLeft}
        textFooterRight={textFooterRight}
        onPressFooterRight={onPressFooterRight}
        loading={sending}>
        {this.renderTop()}
        <View style={viewStyleBottomContainer}>{this.renderBottom()}</View>
      </FullScreenForm>
    );
  }

  renderTop() {
    const {
      sendState,
      sendWallet,
      sendAmount,
      sendRecipient,
      sendNote,
      sendError,
      setSendState,
    } = this.props;
    const currency = sendWallet.currency.currency;

    const {
      viewStyleTopContainer,
      buttonStyleOutput,
      viewStyleError,
      textStyleError,
    } = styles;
    return (
      <View style={viewStyleTopContainer}>
        {sendState === 'success' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send successful!</Text>
          </View>
        ) : null}
        {sendState === 'note' ||
        sendState === 'recipient' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('amount')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output
              label="Amount"
              value={
                currency.symbol +
                ' ' +
                parseFloat(sendAmount).toFixed(currency.divisibility)
              }
            />
          </TouchableHighlight>
        ) : null}
        {sendState === 'note' ||
        sendState === 'confirm' ||
        sendState === 'success' ? (
          <TouchableHighlight
            onPress={() => setSendState('recipient')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output label="Recipient" value={sendRecipient} />
          </TouchableHighlight>
        ) : null}
        {(sendState === 'confirm' || sendState === 'success') && sendNote ? (
          <TouchableHighlight
            onPress={() => setSendState('note')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output label="Note" value={sendNote} />
          </TouchableHighlight>
        ) : null}
        {sendState === 'fail' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Send failed</Text>
            <Text style={textStyleError}>{sendError}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderBottom() {
    const {
      sendState,
      sendAmount,
      sendWallet,
      sendRecipient,
      updateAccountField,
      sendNote,
      validateSendAmount,
      validateSendRecipient,
      validateSendNote,
      sendError,
      company_config,
    } = this.props;
    const { colors } = company_config;
    switch (sendState) {
      case 'amount':
        return (
          <Input
            key={sendState}
            placeholder="e.g. 10"
            label={'Amount [' + sendWallet.currency.currency.symbol + ']'}
            prefix={sendWallet.currency.currency.symbol}
            inputError={sendError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="numeric"
            value={sendAmount}
            onChangeText={value =>
              updateAccountField({ prop: 'sendAmount', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendAmount(sendWallet, sendAmount)}
            colors={colors}
          />
        );
      case 'recipient':
        return (
          <Input
            key="recipient"
            placeholder="e.g. user@rehive.com"
            label={'Please enter recipient'}
            value={sendRecipient}
            onChangeText={value =>
              updateAccountField({ prop: 'sendRecipient', value })
            }
            inputError={sendError}
            reference={input => {
              this.input = input;
            }}
            // keyboardType="numeric"
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendRecipient(sendRecipient)}
            colors={colors}
          />
        );
      case 'note':
        return (
          <Input
            key="note"
            placeholder="e.g. Rent"
            label="Note:"
            value={sendNote}
            onChangeText={value =>
              updateAccountField({ prop: 'sendNote', value })
            }
            inputError={sendError}
            reference={input => {
              this.input = input;
            }}
            multiline
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateSendNote(sendNote)}
            colors={colors}
          />
        );
      default:
        return <View />;
    }
  }

  render() {
    const { pin, fingerprint } = this.props;
    // console.log(pin, fingerprint);
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Send" back />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'never'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
          {this.state.pinVisible ? (
            <PinModal
              pin={pin}
              fingerprint={fingerprint}
              modalVisible={this.state.pinVisible}
              onSuccess={() => {
                this.setState({ pinVisible: false });
                this.performSend();
              }}
              onDismiss={() => this.setState({ pinVisible: false })}
            />
          ) : null}
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}>
            {this.renderMainContainer()}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.focus,
    // paddingTop: 10,
  },
  viewStyleTopContainer: {
    // justifyContent: 'center',
    paddingTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: 'orange',
    // flex: 2,
  },
  buttonStyleOutput: { width: '100%', borderRadius: 3, marginHorizontal: 8 },
  viewStyleBottomContainer: {
    // width: '100%',
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
    // flex: 1,
    // minHeight: 100,
    borderRadius: 2,
    // position: 'absolute',
    // bottom: 0,
  },
  // contact: {
  //   height: 40,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  textStyleOutput: {
    fontSize: 16,
    // alignSelf: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  viewStyleError: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleError: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const mapStateToProps = ({ accounts, auth }) => {
  const { pin, fingerprint, company_config } = auth;
  const {
    wallets,
    sendAmount,
    sendWallet,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    tempCurrency,
    sendError,
    sending,
  } = accounts;
  return {
    wallets,
    tempCurrency,
    sendAmount,
    sendWallet,
    sendRecipient,
    sendNote,
    sendReference,
    sendState,
    sendError,
    sending,
    pin,
    fingerprint,
    company_config,
  };
};

export default connect(mapStateToProps, {
  updateAccountField,
  setSendWallet,
  validateSendAmount,
  validateSendRecipient,
  validateSendNote,
  setSendState,
  send,
})(SendScreen);
