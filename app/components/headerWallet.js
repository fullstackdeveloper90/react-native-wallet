import React, { Component } from 'react';
import { View, FlatList, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
  setWithdrawWallet,
  resetWithdraw,
  viewWallet,
  hideWallet,
} from './../redux/actions';

import WalletAction from './WalletAction';
import HeaderCurrency from './HeaderCurrency';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HeaderWallet extends Component {
  scrollX = new Animated.Value(0);

  componentDidMount() {
    if (this.props.wallets.length > 1) {
      this.flatListRef.scrollToIndex({
        animated: false,
        index: this.props.activeWalletIndex || 0,
      });
    }
  }

  getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  renderWallets() {
    const { wallets, showClose, hideWallet, colors } = this.props;
    if (wallets.length === 1) {
      return (
        <HeaderCurrency
          detail
          wallet={wallets[0]}
          showClose={showClose}
          closeWallet={hideWallet}
          colors={colors}
        />
      );
    } else {
      return (
        <FlatList
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={this.props.wallets}
          horizontal
          pagingEnabled
          getItemLayout={this.getItemLayout}
          renderItem={({ item }) => (
            <HeaderCurrency wallet={item} colors={colors} />
          )}
          keyExtractor={item => item.account_name + item.currency.currency.code}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  }

  renderItem(item, index) {
    // let position = Animated.divide(this.scrollX, SCREEN_WIDTH);
    // let i = index;
    // // console.log(i);
    // // console.log(position);
    // let opacity = position.interpolate({
    //   inputRange: [
    //     SCREEN_WIDTH * (i - 1),
    //     SCREEN_WIDTH * i,
    //     SCREEN_WIDTH * (i + 1),
    //   ],
    //   outputRange: [0.5, 1, 0.5],
    //   extrapolate: 'clamp',
    // });
    return (
      <Animated.View
        key={item.account_name + item.currency.currency.code}
        // style={{ opacity }}
      >
        <HeaderCurrency wallet={item} />
      </Animated.View>
    );

    return;
  }

  handleViewableItemsChanged = info => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      this.props.setActiveWalletIndex(info.viewableItems[0].index);
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  renderButtons() {
    const { viewStyleButtons } = styles;
    return (
      <View>
        <FlatList
          contentContainerStyle={viewStyleButtons}
          data={this.props.buttons}
          horizontal
          scrollEnabled={false}
          renderItem={({ item }) => (
            <WalletAction
              type={item.type}
              onPress={() => this.onButtonPress(item.type)}
              color={this.props.colors.primaryContrast}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  onButtonPress(type) {
    const {
      wallets,
      activeWalletIndex,
      setWithdrawWallet,
      resetSend,
      setSendWallet,
      navigation,
      resetWithdraw,
    } = this.props;
    switch (type) {
      case 'send': {
        resetSend();
        setSendWallet(
          wallets.length > 1 ? wallets[activeWalletIndex] : wallets[0],
        );
        navigation.navigate('Send');
        break;
      }
      case 'receive': {
        navigation.navigate('Receive');
        break;
      }
      case 'withdraw': {
        resetWithdraw();
        setWithdrawWallet(
          wallets.length > 1 ? wallets[activeWalletIndex] : wallets[0],
        );
        navigation.navigate('Withdraw');
        break;
      }
      case 'deposit': {
        navigation.navigate('Deposit');
        break;
      }
      case 'more':
        navigation.navigate('Wallets', {
          wallet: wallets[activeWalletIndex],
        });
        break;
      default:
        console.log('Error: unknown button type');
    }
  }

  render() {
    const { colors } = this.props;
    const { viewStyleContainer } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.primary }]}>
        {this.renderWallets()}
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
  },
  viewStyleButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 8,
  },
};

const mapStateToProps = ({ accounts }) => {
  const { user, activeWalletIndex, tempWallet } = accounts;
  return {
    user,
    activeWalletIndex,
    tempWallet,
  };
};

export default connect(mapStateToProps, {
  setActiveWalletIndex,
  setSendWallet,
  resetSend,
  setWithdrawWallet,
  resetWithdraw,
  viewWallet,
  hideWallet,
})(HeaderWallet);
