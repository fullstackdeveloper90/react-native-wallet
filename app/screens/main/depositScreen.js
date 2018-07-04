import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './../../redux/actions';

import UserInfoService from './../../services/userInfoService';
import Colors from './../../config/colors';
import Header from './../../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Output } from './../../components/common';
import CardList from './../../components/CardList';

class DepositScreen extends Component {
  static navigationOptions = {
    title: 'Deposit',
  };

  componentDidMount() {
    this.props.fetchData('company_bank_account');
  }

  renderContent = item => {
    const { viewStyleContent } = styles;
    const {
      name,
      type,
      number,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
      currencies,
    } = item;
    return (
      <View style={viewStyleContent}>
        <Output label="Currencies" value={this.renderCurrencies(currencies)} />
        {name ? <Output label="Name" value={name} /> : null}
        {type ? <Output label="Type" value={type} /> : null}
        {number ? <Output label="Number" value={number} /> : null}
        {bank_name ? <Output label="Bank name" value={bank_name} /> : null}
        {bank_code ? <Output label="Bank code" value={bank_code} /> : null}
        {branch_code ? (
          <Output label="Branch name" value={branch_code} />
        ) : null}
        {swift ? <Output label="Swift" value={swift} /> : null}
        {iban ? <Output label="IBAN" value={iban} /> : null}
        {bic ? <Output label="BIC" value={bic} /> : null}
      </View>
    );
  };

  renderCurrencies(currencies) {
    let currencyText = '';
    if (currencies.length > 0) {
      currencyText = currencies[0].code;
      for (let i = 0; i < currencies.length; i++) {
        currencyText =
          currencyText +
          (i < currencies.length - 1 ? ', ' : ' or ') +
          currencies[i].code;
      }
    }
    return currencyText;
  }

  render() {
    const {
      company_bank_account,
      loading_company_bank_account,
      tempWallet,
    } = this.props;
    const {
      containerStyle,
      containerStyleComment,
      textStyleComment,
      containerStyleReference,
      textStyleCommentReference,
    } = styles;
    return (
      <View style={containerStyle}>
        <Header navigation={this.props.navigation} back title="Deposit" />
        <View style={containerStyleComment}>
          <Text style={textStyleComment}>
            Fund your account by transferring one of the listed currencies with
            the unique reference number below.
          </Text>
        </View>
        <View style={containerStyleReference}>
          <Text style={textStyleCommentReference}>
            {tempWallet.account_reference}
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => {
              Clipboard.setString(tempWallet.account_reference);
              Alert.alert(null, 'Copied');
            }}>
            <Icon name="content-copy" size={24} color={Colors.black} />
          </TouchableHighlight>
        </View>
        <CardList
          type="company_bank_account"
          data={company_bank_account}
          loadingData={loading_company_bank_account}
          renderContent={this.renderContent}
          emptyListMessage="No company bank accounts added yet"
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewStyleContent: {
    padding: 8,
  },
  containerStyleComment: {
    // flex: 2,
    backgroundColor: Colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 16,
    padding: 16,
  },
  textStyleComment: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  containerStyleReference: {
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
  },
  textStyleCommentReference: {
    fontSize: 28,
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
};

const mapStateToProps = ({ user, accounts }) => {
  const { company_bank_account, loading_company_bank_account } = user;
  const { tempWallet } = accounts;
  return { company_bank_account, loading_company_bank_account, tempWallet };
};

export default connect(mapStateToProps, { fetchData })(DepositScreen);
