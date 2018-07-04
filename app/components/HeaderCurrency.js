import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Colors from './../config/colors';
import { HeaderButton } from './common';
import { performDivisibility } from './../util/general';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderCurrency extends Component {
  render() {
    const {
      detail,
      showAccountLabel,
      showClose,
      closeWallet,
      colors,
    } = this.props;
    const { currency, account_name } = this.props.wallet;
    const {
      viewStyleContainer,
      viewStyleCurrency,
      textStyleCode,
      textStyleAccount,
      textStyleSymbol,
      textStyleAmount,
      iconStyleTitleRight,
    } = styles;
    console.log();
    return (
      <View
        style={[
          viewStyleContainer,
          detail
            ? {
                paddingTop: 12,
                width: SCREEN_WIDTH - 16,
              }
            : { width: SCREEN_WIDTH },
        ]}>
        {showClose ? (
          <View style={iconStyleTitleRight}>
            <HeaderButton
              icon="close"
              onPress={closeWallet}
              color={Colors.lightGray}
            />
          </View>
        ) : null}
        <Text style={[textStyleCode, { color: colors.primaryContrast }]}>
          {currency.currency.code}
        </Text>
        {showAccountLabel ? (
          <Text style={[textStyleAccount, { color: colors.primaryContrast }]}>
            {account_name}
          </Text>
        ) : null}
        {/* {showClose ? (
          <HeaderButton
            icon='close'
            onPress={onPressTitleRight}
            color={
              titleStyle
                ? Colors[titleStyle + 'Contrast']
                : Colors.primaryContrast
            }
          />
        ) : null} */}
        <View
          style={[viewStyleCurrency, detail ? null : { paddingBottom: 16 }]}>
          <Text style={[textStyleSymbol, { color: colors.focus }]}>
            {currency.currency.symbol}
          </Text>
          <Text style={this.getAmountTextStyle(currency)}>
            {' '}
            {performDivisibility(
              currency.available_balance,
              currency.currency.divisibility,
            ).toFixed(currency.currency.divisibility)}
          </Text>
        </View>
      </View>
    );
  }

  getAmountTextStyle(currency) {
    const { colors } = this.props;
    let fontSize = 42;
    let length =
      currency.available_balance.toString().length +
      currency.currency.divisibility;
    if (length > 16) {
      fontSize = 20;
    } else if (length > 12) {
      fontSize = 30;
    } else if (length > 8) {
      fontSize = 38;
    }
    return [styles.textStyleAmount, { fontSize, color: colors.focus }];
  }
}

const styles = {
  viewStyleContainer: {
    // flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyleCurrency: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleCode: {
    color: Colors.onPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  textStyleAccount: {
    color: Colors.onPrimary,
    fontSize: 16,
    // fontWeight: 'bold',
    paddingBottom: 8,
  },
  textStyleSymbol: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  textStyleAmount: {
    fontSize: 42,
    // paddingHorizontal: 2,
    // flexWrap: 'no-wrap',
    fontWeight: 'bold',
  },
  iconStyleTitleRight: {
    right: -8,
    top: -8,
    margin: 0,
    position: 'absolute',
  },
};

const mapStateToProps = ({ accounts }) => {
  const { showAccountLabel } = accounts;
  return { showAccountLabel };
};

export default connect(mapStateToProps, {})(HeaderCurrency);
