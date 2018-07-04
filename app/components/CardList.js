// import lib for making component
import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  updateInputField,
  fetchData,
  newItem,
  editItem,
  primaryItem,
  updateItem,
  deleteItem,
  confirmDeleteItem,
  resendVerification,
  verifyItem,
  showModal,
  hideModal,
  // setActiveCurrency,
} from './../redux/actions';
import { standardizeString } from './../util/general';

import { Card, PopUpGeneral, EmptyListMessage, Input } from './common';

// make component
class CardList extends Component {
  componentDidMount() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    } else {
      this.props.fetchData(this.props.type);
    }
  }

  renderItem = item => {
    const {
      type,
      headerComponent,
      onPressHeader,
      textTitleLeft,
      iconTitleLeft,
      itemActive,
      onPressTitleLeft,
      title,
      subtitle,
      titleStyle,
      onPressTitle,
      identifier,
      onPressContent,
      textActionOne,
      onPressActionOne,
      textActionTwo,
      onPressActionTwo,
      renderContent,
      canEdit,
      canVerify,
      canPrimary,
      canDelete,
      canActive,
      profile,
      onPressFooter,
      iconFooter,
      // redux actions
      editItem,
      deleteItem,
      primaryItem,
      activeItem,
      resendVerification,
    } = this.props;
    return (
      <Card
        headerComponent={headerComponent}
        onPressHeader={onPressHeader}
        textTitleLeft={textTitleLeft ? textTitleLeft(item) : ''}
        iconTitleLeft={iconTitleLeft}
        itemActive={itemActive ? itemActive(item) : false}
        onPressTitleLeft={() =>
          onPressTitleLeft
            ? onPressTitleLeft(item)
            : canActive ? activeItem(type, item) : null
        }
        title={title ? title(item) : ''}
        subtitle={subtitle ? subtitle(item) : ''}
        colorTitleBackground="white"
        onPressTitle={() =>
          onPressTitle
            ? onPressTitle(item)
            : canEdit ? editItem(type, item) : null
        }
        onPressContent={() =>
          onPressContent
            ? onPressContent(item)
            : canEdit ? editItem(type, item) : null
        }
        iconFooter={
          iconFooter
            ? iconFooter
            : canDelete ? (!item.primary ? 'delete' : '') : ''
        }
        onPressFooter={
          onPressFooter
            ? onPressFooter
            : canDelete
              ? (itemActive ? !itemActive(item) : true)
                ? () => deleteItem(type, item)
                : null
              : null
        }
        textActionTwo={
          textActionTwo
            ? textActionTwo
            : canVerify ? (!item.verified ? 'VERIFY' : 'Verified') : ''
        }
        disableActionTwo={canVerify ? (!item.verified ? false : true) : false}
        onPressActionTwo={() =>
          onPressActionTwo
            ? onPressActionTwo(item)
            : canVerify
              ? resendVerification(type, item[identifier], profile.company)
              : null
        }
        textActionOne={
          textActionOne
            ? textActionOne
            : canPrimary ? (item.primary ? 'Primary' : 'MAKE PRIMARY') : ''
        }
        disableActionOne={canPrimary ? (!item.primary ? false : true) : false}
        onPressActionOne={() =>
          onPressActionOne
            ? onPressActionOne(item)
            : canPrimary ? primaryItem(type, item) : null
        }
        // backgroundColor={canPrimary ? (item.primary ? 'focus' : '') : ''}
        // loading={loading}
        // swipeableContent={<Text>Pull to activate</Text>}
      >
        {renderContent ? renderContent(item) : null}
      </Card>
    );
  };

  renderEmptyList() {
    const { refreshing, emptyListMessage } = this.props;
    if (!refreshing) {
      return <EmptyListMessage text={emptyListMessage} />;
    }
    return;
  }

  renderModal() {
    const {
      modalVisible,
      modalType,
      hideModal,
      loading,
      type,
      tempItem,
      identifier,
      updateError,
      temp_otp,
      otp,
      // redux actions
      setActiveCurrency,
      updateInputField,
      updateItem,
      confirmDeleteItem,
      verifyItem,
    } = this.props;

    let contentText = '';
    let textActionOne = '';
    let onPressActionOne = null;
    let textActionTwo = 'CANCEL';
    let onPressActionTwo = hideModal;
    let content = null;
    console.log(identifier, tempItem);
    if (identifier && tempItem) {
      switch (modalType) {
        case 'delete':
          contentText = 'Delete ' + tempItem[identifier] + '?';
          textActionOne = 'DELETE';
          onPressActionOne = () => confirmDeleteItem(type, tempItem);
          break;
        case 'primary':
          contentText = 'Make ' + tempItem[identifier] + ' primary?';
          textActionOne = 'MAKE PRIMARY';
          onPressActionOne = () => updateItem(type, tempItem);
          break;
        case 'active':
          contentText =
            'Make ' + tempItem.currency.currency.code + ' active wallet?';
          textActionOne = 'MAKE ACTIVE';
          onPressActionOne = () => setActiveCurrency(tempItem);
          break;
        case 'verify':
          textActionTwo = 'CLOSE';
          if (type === 'email') {
            contentText = 'Verification email has been sent to ' + tempItem;
          } else if (type === 'mobile') {
            textActionOne = 'VERIFY';
            contentText = 'Verification sms has been sent to ' + tempItem;
            content = (
              <Input
                label="OTP"
                placeholder="e.g. 1234"
                autoCapitalize="none"
                value={otp}
                inputError={updateError}
                onChangeText={input => updateInputField('otp', 'otp', input)}
              />
            );
            console.log('otp', otp);
            onPressActionOne = () => verifyItem(type, otp.otp);
          }

          break;
      }
    }

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={standardizeString(contentText)}
        textActionOne={textActionOne}
        onPressActionOne={onPressActionOne}
        onDismiss={hideModal}
        textActionTwo={textActionTwo}
        onPressActionTwo={onPressActionTwo}
        loading={loading}
        errorText={updateError}>
        {content}
      </PopUpGeneral>
    );
  }

  render() {
    const {
      loading,
      loadingData,
      type,
      data,
      keyExtractor,
      renderDetail,
      navigation,
      tempItem,
      showDetail,
      wallet,
      // redux actions
      updateItem,
      fetchData,
    } = this.props;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#e4e4e4',
        }}
        behavior={'padding'}
        enabled>
        {showDetail ? (
          <ScrollView
            keyboardDismissMode={'interactive'}
            keyboardShouldPersistTaps="always">
            <Card
              key={type}
              textActionOne={wallet ? '' : 'SAVE'}
              onPressActionOne={() => updateItem(type, tempItem)}
              textActionTwo={wallet ? '' : 'CANCEL'}
              onPressActionTwo={() => fetchData(type)}
              loading={loading}>
              {renderDetail
                ? renderDetail(
                    tempItem ? tempItem : null,
                    navigation ? navigation : null,
                  )
                : null}
            </Card>
          </ScrollView>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchData(type)}
              />
            }
            data={data}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={
              keyExtractor
                ? keyExtractor
                : item => (item.id ? item.id.toString() : null)
            }
            ListEmptyComponent={this.renderEmptyList()}
          />
        )}
        {this.renderModal()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ user, auth }) => {
  const {
    profile,
    showDetail,
    updateError,
    modalVisible,
    loading,
    editing,
    wallet,
    modalType,
  } = user;
  const { otp } = auth;
  return {
    profile,
    showDetail,
    updateError,
    modalVisible,
    modalType,
    loading,
    editing,
    wallet,
    otp,
  };
};

export default connect(mapStateToProps, {
  updateInputField,
  fetchData,
  newItem,
  editItem,
  primaryItem,
  updateItem,
  deleteItem,
  confirmDeleteItem,
  resendVerification,
  verifyItem,
  showModal,
  hideModal,
})(CardList);
