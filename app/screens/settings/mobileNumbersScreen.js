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

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { number } = item;
    return (
      <View style={viewStyleContent}>
        {number ? <Output label="" value={number} /> : null}
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
    const { number } = tempItem;

    return (
      <Input
        label="Mobile number"
        placeholder="e.g. +278412345687"
        autoCapitalize="none"
        value={number}
        inputError={updateError}
        onChangeText={input => updateInputField('mobile', 'number', input)}
        colors={colors}
      />
    );
  };

  render() {
    const { mobile, tempItem, newItem, updateItem, showDetail } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile numbers"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('mobile', tempItem)
              : () => newItem('mobile')
          }
        />
        <CardList
          type="mobile"
          data={mobile}
          tempItem={tempItem}
          identifier="number"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No mobile numbers added yet"
          canDelete
          canVerify
          canPrimary
        />
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
  viewStyleContent: {
    padding: 8,
  },
};

const mapStateToProps = ({ user, auth }) => {
  const { company_config } = auth;
  const { mobile, tempItem, showDetail } = user;
  return {
    mobile,
    showDetail,
    tempItem,
    company_config,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(MobileNumbersScreen);
