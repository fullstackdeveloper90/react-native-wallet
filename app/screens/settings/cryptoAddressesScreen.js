import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class CryptoAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Crypto accounts',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { address } = item;
    return (
      <View style={viewStyleContent}>
        {address ? <Output label="Address" value={address} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const {
      tempItem,
      updateError,
      updateInputField,
      company_config,
    } = this.props;
    const { colors } = company_config;
    const { address } = tempItem;

    return (
      <Input
        label="Address"
        placeholder="e.g. 78weiytuyiw3begnf3i4uheyrt43"
        autoCapitalize="none"
        value={address}
        inputError={updateError}
        onChangeText={input =>
          updateInputField('crypto_account', 'address', input)
        }
        colors={colors}
      />
    );
  };

  render() {
    const {
      crypto_account,
      tempItem,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Crypto accounts"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('crypto_account', tempItem)
              : () => newItem('crypto_account')
          }
        />
        <CardList
          type="crypto_account"
          data={crypto_account}
          tempItem={tempItem}
          identifier="address"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No crypto accounts added yet"
          canDelete
          canEdit
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = ({ user, auth }) => {
  const { company_config } = auth;
  const {
    crypto_account,
    loading_crypto_account,
    tempItem,
    showDetail,
    updateError,
  } = user;
  return {
    crypto_account,
    loading_crypto_account,
    tempItem,
    showDetail,
    updateError,
    company_config,
  };
};

export default connect(mapStateToProps, {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(CryptoAddressesScreen);
