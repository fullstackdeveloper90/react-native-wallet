import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';
import { ListItem } from './ListItem';

class Input extends Component {
  state = {
    focused: false,
    iconNameVisibility: 'visibility',
    secureTextEntry: this.props.type === 'password' ? true : false,
    cca2: 'US',
    countryCode: '+1',
  };

  _OnBlur() {
    this.setState({
      focused: false,
    });
  }

  _OnFocus() {
    this.setState({
      focused: true,
    });
  }

  togglePasswordVisibility = () => {
    if (this.state.secureTextEntry) {
      this.setState({
        iconNameVisibility: 'visibility-off',
        secureTextEntry: false,
      });
    } else {
      this.setState({
        iconNameVisibility: 'visibility',
        secureTextEntry: true,
      });
    }
  };

  renderInput() {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      reference,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize,
      autoFocus,
      type,
      countryCode,
      changeCountryCode,
      inputError,
      autoCorrect,
      multiline,
    } = this.props;

    const {
      viewStyleInput,
      textStyleInput,
      iconStyleVisibility,
      viewStyleCountry,
      textStyleCode,
    } = styles;

    const {
      borderColor,
      focused,
      secureTextEntry,
      iconNameVisibility,
      cca2,
    } = this.state;

    return (
      <View
        style={[viewStyleInput, { paddingBottom: focused || value ? 8 : 0 }]}>
        {/* {type === 'mobile' ? (
          <View style={viewStyleCountry}>
            <CountryPicker
              onChange={value => {
                this.setState({ cca2: value.cca2 });
                changeCountryCode(value.callingCode);
              }}
              closeable
              filterable
              cca2={cca2}
              translation="eng"
              styles={{ width: 24 }}
            />
          </View>
        ) : null} */}
        <TextInput
          style={textStyleInput}
          onFocus={() => this._OnFocus()}
          onBlur={() => this._OnBlur()}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          autoCorrect={autoCorrect ? autoCorrect : false}
          placeholder={focused ? placeholder : label}
          value={value}
          onChangeText={onChangeText}
          ref={reference}
          selectTextOnFocus
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          blurOnSubmit={false}
          multiline={multiline}
        />
        {type === 'password' ? (
          <View>
            <Icon
              style={[
                iconStyleVisibility,
                {
                  color: inputError
                    ? Colors.error
                    : focused ? Colors.focus : 'rgba(0,0,0,0.6)',
                },
              ]}
              name={iconNameVisibility}
              size={24}
              color={borderColor}
              onPress={this.togglePasswordVisibility}
            />
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const {
      label,
      value,
      required,
      inputError,
      helperText,
      data,
      loadingData,
      title,
      subtitle,
      type,
      onPressListItem,
      colors,
    } = this.props;
    console.log(this.props);

    const {
      viewStyleContainer,
      viewStyleLabel,
      viewStyleHelper,
      textStyleLabel,
      textStyleFooter,
      viewStyleContent,
      viewStylePopUp,
    } = styles;

    const { focused } = this.state;

    return (
      <View>
        <View
          style={[
            viewStyleContainer,
            {
              backgroundColor: colors.primaryContrast,
            },
          ]}>
          <View
            style={[
              viewStyleContent,
              {
                borderColor: inputError
                  ? colors.error
                  : focused ? colors.focus : colors.lightGray,
                borderBottomWidth: inputError || focused ? 2 : 1,
              },
            ]}>
            {focused || value ? (
              <View style={viewStyleLabel}>
                <Text
                  style={[
                    textStyleLabel,
                    {
                      color: inputError
                        ? colors.error
                        : focused ? colors.focus : 'rgba(0,0,0,0.6)',
                    },
                  ]}>
                  {label}
                  {required ? ' *' : ''}
                </Text>
              </View>
            ) : null}
            {this.renderInput()}
          </View>

          {data ? (
            <FlatList
              // refreshControl={
              //   <RefreshControl
              //     refreshing={loadingData}
              //     onRefresh={() => fetchData(type)}
              //   />string.indexOf(substring) !== -1
              // }
              keyboardShouldPersistTaps="handled"
              style={{ backgroundColor: colors.primaryContrast }}
              // data={data.filter(item => item[title] === value)}
              data={
                value
                  ? data.filter(item => item[title].indexOf(value) !== -1)
                  : data
              }
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => onPressListItem(item)}
                  title={item[title]}
                  subtitle={item[subtitle]}
                />
              )}
              keyExtractor={item => (item.id ? item.id.toString() : '')}
              // ListEmptyComponent={<ListItem title="No data" />}
            />
          ) : null}

          {inputError || helperText ? (
            <View style={viewStyleHelper}>
              <Text
                style={[
                  textStyleFooter,
                  { color: inputError ? colors.error : colors.primaryContrast },
                ]}>
                {inputError ? 'Error: ' + inputError : helperText}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    minHeight: 56,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
    margin: 8,
    // borderRadius: 3,
    // borderColor: Colors.primary,
  },
  viewStyleContent: {
    paddingHorizontal: 12,
    minHeight: 56,
    justifyContent: 'center',
  },
  viewStylePopUp: {
    // position: 'absolute',
    // top: 8,
    // flex: 1,
    elevation: 20,
    backgroundColor: 'orange',
    height: 200,
    // width: 100,
  },
  viewStyleLabel: {
    height: 20,
  },
  viewStyleCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyleInput: {
    flexDirection: 'row',
    // height: 32,
  },
  viewStyleHelper: {
    minHeight: 28,
  },
  textStyleLabel: {
    fontSize: 12,
    paddingTop: 6,
  },
  textStyleInput: {
    fontWeight: 'normal',
    flex: 1,
    fontSize: 16,
    // height: 24,
    color: 'rgba(0,0,0,0.87)',
  },
  textStyleCode: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
    textAlign: 'right',
    fontWeight: 'normal',
    alignItems: 'center',
  },
  textStyleFooter: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  iconStyleVisibility: {
    width: 24,
    height: 24,
    right: 0,
    bottom: 4,
    position: 'absolute',
  },
};

export { Input };
