import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class EmailAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Email addresses',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { email } = item;
    return (
      <View style={viewStyleContent}>
        {email ? <Output label="" value={email} /> : null}
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
    const { email } = tempItem;

    return (
      <Input
        label="Email address"
        placeholder="e.g. user@rehive.com"
        autoCapitalize="none"
        value={email}
        inputError={updateError}
        onChangeText={input => updateInputField('email', 'email', input)}
        colors={colors}
      />
    );
  };

  render() {
    const { email, tempItem, newItem, updateItem, showDetail } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('email', tempItem)
              : () => newItem('email')
          }
        />
        <CardList
          type="email"
          data={email}
          tempItem={tempItem}
          identifier="email"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No email addresses added yet"
          canDelete
          canVerify
          canPrimary
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
  const { email, tempItem, updateError, showDetail } = user;
  return {
    email,
    tempItem,
    updateError,
    showDetail,
    company_config,
  };
};

export default connect(mapStateToProps, {
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(EmailAddressesScreen);
