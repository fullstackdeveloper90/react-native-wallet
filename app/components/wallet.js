import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  setSendWallet,
  resetSend,
  setActiveCurrency,
} from './../redux/actions';

import Colors from './../config/colors';

import { Card, Output } from './../components/common';

class Wallet extends Component {
  getBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    return balance;
  };

  send() {
    this.props.resetSend();
    this.props.setSendWallet(this.props.wallet);
    this.props.navigation.navigate('Send');
  }

  setActiveCurrency = () => {
    this.props.setActiveCurrency(this.props.wallet);
  };

  render() {
    const { wallet, showDetails } = this.props;
    const {
      textStyleLabel,
      textStyleBalance,
      textStyleAvailable,
      viewStyleContainer,
    } = styles;
    const balance =
      wallet.currency.currency.symbol +
      ' ' +
      this.getBalance(
        wallet.currency.balance,
        wallet.currency.currency.divisibility,
      ).toFixed(wallet.currency.currency.divisibility);
    const available =
      wallet.currency.currency.symbol +
      ' ' +
      this.getBalance(
        wallet.currency.available_balance,
        wallet.currency.currency.divisibility,
      ).toFixed(wallet.currency.currency.divisibility);
    return (
      <Card
        onPressTitle={showDetails}
        title={wallet.currency.currency.description}
        subtitle={wallet.account_name}
        textActionOne="Send"
        onPressActionOne={() => this.send()}
        textActionTwo="Receive"
        onPressActionTwo={() => this.props.navigation.navigate('Receive')}
        textTitleLeft={wallet.currency.currency.code}
        itemActive={wallet.currency.active}
        onPressTitleLeft={() => this.setActiveCurrency()}
        loading={this.props.loadingDefaultAccountChange}>
        <View style={viewStyleContainer}>
          <Output label="Balance" value={balance} />
          <Output label="Available" value={available} />
        </View>
      </Card>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingLeft: 16,
    paddingTop: 8,
  },
  textStyleLabel: {
    color: 'grey',
    fontSize: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  textStyleBalance: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
    paddingBottom: 8,
  },
  textStyleAvailable: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textStyleDescription: {
    color: 'black',
    fontSize: 16,
    paddingBottom: 16,
  },
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {
  setSendWallet,
  resetSend,
  setActiveCurrency,
})(Wallet);
