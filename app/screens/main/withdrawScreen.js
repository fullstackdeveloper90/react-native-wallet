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
  setWithdrawWallet,
  setWithdrawBankAccount,
  validateWithdrawAmount,
  validateWithdrawRecipient,
  validateWithdrawNote,
  setWithdrawState,
  updateAccountField,
  withdraw,
} from '../../redux/actions';

import { Input, FullScreenForm, Output } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';

class WithdrawScreen extends Component {
  static navigationOptions = () => ({
    title: 'Withdraw Amount',
  });

  componentDidMount() {
    if (this.props.withdrawWallet === null) {
      this.props.setWithdrawWallet(wallets[activeWalletIndex]);
    }
  }

  performWithdraw() {
    const {
      withdrawWallet,
      withdrawAmount,
      // withdrawRecipient,
      withdrawBankAccount,
      withdrawNote,
    } = this.props;

    let data = {
      amount: withdrawAmount,
      currency: withdrawWallet.currency.currency,
      metadata: { bank_account: withdrawBankAccount },
      note: withdrawNote,
      reference: withdrawWallet.account_reference,
    };
    this.props.withdraw(data);
  }

  renderMainContainer() {
    const {
      withdrawing,
      withdrawState,
      withdrawWallet,
      withdrawAccount,
      validateWithdrawAmount,
      validateWithdrawRecipient,
      validateWithdrawNote,
      withdrawAmount,
      validateWithdrawAccount,
      withdrawNote,
      withdrawError,
      setWithdrawState,
    } = this.props;

    const { viewStyleBottomContainer } = styles;

    let textFooterRight = 'Next';
    let textFooterLeft = '';
    let onPressFooterRight = () => {};
    let onPressFooterLeft = () => {};

    switch (withdrawState) {
      case 'amount':
        onPressFooterRight = () =>
          validateWithdrawAmount(withdrawWallet, withdrawAmount);
        break;
      case 'account':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setWithdrawState('amount');
        onPressFooterRight = () => validateWithdrawAccount(withdrawAccount);
        break;
      case 'note':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setWithdrawState('amount');
        onPressFooterRight = () => validateWithdrawNote(withdrawNote);
        break;
      case 'confirm':
        textFooterLeft = 'Edit';
        onPressFooterLeft = () => setWithdrawState('amount');
        textFooterRight = 'Confirm';
        onPressFooterRight = () => this.performWithdraw();
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
        loading={withdrawing}>
        {this.renderTop()}
        <View style={viewStyleBottomContainer}>{this.renderBottom()}</View>
      </FullScreenForm>
    );
  }

  renderTop() {
    const {
      withdrawState,
      withdrawWallet,
      withdrawAmount,
      withdrawBankAccount,
      withdrawNote,
      withdrawError,
      setWithdrawState,
    } = this.props;
    const currency = withdrawWallet.currency.currency;

    const {
      viewStyleTopContainer,
      buttonStyleOutput,
      viewStyleError,
      textStyleError,
    } = styles;
    return (
      <View style={viewStyleTopContainer}>
        {withdrawState === 'success' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Withdraw successful!</Text>
          </View>
        ) : null}
        {withdrawState === 'note' ||
        withdrawState === 'account' ||
        withdrawState === 'confirm' ||
        withdrawState === 'success' ? (
          <TouchableHighlight
            onPress={() => setWithdrawState('amount')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output
              label="Amount"
              value={
                currency.symbol +
                ' ' +
                parseFloat(withdrawAmount).toFixed(currency.divisibility)
              }
            />
          </TouchableHighlight>
        ) : null}
        {withdrawState === 'note' ||
        withdrawState === 'confirm' ||
        withdrawState === 'success' ? (
          <TouchableHighlight
            onPress={() => setWithdrawState('account')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output label="Account" value={withdrawBankAccount.name} />
          </TouchableHighlight>
        ) : null}
        {(withdrawState === 'confirm' || withdrawState === 'success') &&
        withdrawNote ? (
          <TouchableHighlight
            onPress={() => setWithdrawState('note')}
            underlayColor={Colors.lightGray}
            style={buttonStyleOutput}>
            <Output label="Note" value={withdrawNote} />
          </TouchableHighlight>
        ) : null}
        {withdrawState === 'fail' ? (
          <View style={viewStyleError}>
            <Text style={textStyleError}>Withdraw failed</Text>
            <Text style={textStyleError}>{withdrawError}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderBottom() {
    const {
      withdrawState,
      withdrawAmount,
      withdrawWallet,
      withdrawAccountName,
      updateAccountField,
      withdrawNote,
      validateWithdrawAmount,
      setWithdrawBankAccount,
      validateWithdrawNote,
      withdrawError,
      bank_account,
      loading_bank_account,
      setWithdrawState,
      company_config,
    } = this.props;
    const { colors } = company_config;

    switch (withdrawState) {
      case 'amount':
        return (
          <Input
            key="amount"
            placeholder="e.g. 10"
            label={'Amount [' + withdrawWallet.currency.currency.symbol + ']'}
            prefix={withdrawWallet.currency.currency.symbol}
            inputError={withdrawError}
            reference={input => {
              this.input = input;
            }}
            keyboardType="numeric"
            value={withdrawAmount}
            onChangeText={value =>
              updateAccountField({ prop: 'withdrawAmount', value })
            }
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() =>
              validateWithdrawAmount(withdrawWallet, withdrawAmount)
            }
            colors={colors}
          />
        );
      case 'account':
        return (
          <Input
            popUp
            key="account"
            placeholder="e.g. FNB"
            label={'Please select account'}
            value={withdrawAccountName}
            onChangeText={value =>
              updateAccountField({ prop: 'withdrawAccountName', value })
            }
            inputError={withdrawError}
            reference={input => {
              this.input = input;
            }}
            returnKeyType="next"
            autoFocus
            type="account"
            data={bank_account}
            loadingData={loading_bank_account}
            title="name"
            subtitle="number"
            onPressListItem={item => {
              setWithdrawBankAccount(item);
              setWithdrawState('note');
            }}
            colors={colors}
          />
        );
      case 'note':
        return (
          <Input
            key="note"
            placeholder="e.g. Rent"
            label="Note:"
            value={withdrawNote}
            onChangeText={value =>
              updateAccountField({ prop: 'withdrawNote', value })
            }
            inputError={withdrawError}
            reference={input => {
              this.input = input;
            }}
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => validateWithdrawNote(withdrawNote)}
            colors={colors}
          />
        );
      default:
        return <View />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title="Withdraw"
          right
          back
        />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'never'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
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

const mapStateToProps = ({ accounts, user, auth }) => {
  const { pin, fingerprint, company_config } = auth;
  const {
    wallets,
    withdrawAmount,
    withdrawWallet,
    withdrawBankAccount,
    withdrawNote,
    withdrawReference,
    withdrawAccountName,
    withdrawState,
    tempCurrency,
    withdrawError,
    withdrawing,
  } = accounts;
  const { bank_account, loading_bank_account } = user;
  return {
    wallets,
    tempCurrency,
    withdrawAmount,
    withdrawWallet,
    withdrawBankAccount,
    withdrawNote,
    withdrawReference,
    withdrawAccountName,
    withdrawState,
    withdrawError,
    withdrawing,
    bank_account,
    loading_bank_account,
    pin,
    fingerprint,
    company_config,
  };
};

export default connect(mapStateToProps, {
  updateAccountField,
  setWithdrawWallet,
  validateWithdrawAmount,
  setWithdrawBankAccount,
  validateWithdrawRecipient,
  validateWithdrawNote,
  setWithdrawState,
  withdraw,
})(WithdrawScreen);
