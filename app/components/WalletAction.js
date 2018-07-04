import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Colors from './../config/colors';
import { CustomIcon } from './../components/common';

class WalletAction extends Component {
  renderButton() {
    const { type, color } = this.props;
    const { viewStyleContainer, iconStyle, textStyleLabel } = styles;
    let source = '';
    let label = '';

    switch (type) {
      case 'send':
        label = 'Send';
        source = require('./../../assets/icons/send.png');
        break;
      case 'receive':
        source = require('./../../assets/icons/receive.png');
        label = 'Receive';
        break;
      case 'deposit':
        source = require('./../../assets/icons/deposit.png');
        label = 'Deposit';
        break;
      case 'withdraw':
        source = require('./../../assets/icons/withdraw.png');
        label = 'Withdraw';
        break;
      case 'more':
        source = require('./../../assets/icons/more.png');
        label = 'More';
        break;
      default:
        label = 'unknown';
    }
    return (
      <View style={viewStyleContainer}>
        <CustomIcon name={type} size={48} color={color} />
        {/* <Image
          source={source}
          resizeMode="contain"
          color={Colors.onPrimary}
          style={iconStyle}
        /> */}
        <Text style={[textStyleLabel, { color }]}>{label}</Text>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        // style={this.buttonStyle()}
        // ref={reference}
      >
        {this.renderButton()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingVertical: 16,
    flexDirection: 'column',
    // marginRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    height: 48,
    width: 48,
    marginBottom: 4,
  },
  textStyleLabel: {
    color: Colors.onPrimary,
    fontSize: 14,
    // fontWeight: 'bold',
    // paddingTop: 2,
  },
};

export default WalletAction;
