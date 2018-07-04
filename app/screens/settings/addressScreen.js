import React, { Component } from 'react';
import { View, Alert, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
} from './../../redux/actions';

// import CountryPicker from 'react-native-country-picker-modal';
import { Input, Output, CardContainer, Card } from './../../components/common';
import Colors from './../../config/colors';
import Header from './../../components/header';

class AddressScreen extends Component {
  static navigationOptions = {
    title: 'Address',
  };

  componentDidMount() {
    this.props.fetchData('address');
  }

  toggleEdit() {
    this.props.editItem('address', this.props.address);
  }

  render() {
    const {
      loading_address,
      fetchData,
      tempItem,
      address,
      showDetail,
      updateError,
      updateItem,
      updateInputField,
      company_config,
    } = this.props;
    const { colors } = company_config;
    const { line_1, line_2, city, state_province, postal_code } = address;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Address"
          headerRightIcon={showDetail ? 'done' : 'edit'}
          headerRightOnPress={() =>
            showDetail ? updateItem('address', tempItem) : this.toggleEdit()
          }
        />

        <CardContainer>
          <Card
            textActionOne={showDetail ? 'SAVE' : ''}
            onPressActionOne={() => updateItem('address', tempItem)}
            textActionTwo={showDetail ? 'CANCEL' : ''}
            onPressActionTwo={() => fetchData('address')}
            loading={loading_address}
            errorText={updateError}
            onPressContent={() => (!showDetail ? this.toggleEdit() : null)}>
            <View>
              {showDetail ? (
                <View>
                  <Input
                    label="Address line 1"
                    placeholder="e.g. 158 Kloof Street"
                    autoCapitalize="none"
                    value={tempItem.line_1}
                    onChangeText={input =>
                      updateInputField('address', 'line_1', input)
                    }
                    colors={colors}
                  />

                  <Input
                    label="Address line 2"
                    placeholder="e.g. Gardens"
                    autoCapitalize="none"
                    value={tempItem.line_2}
                    onChangeText={input =>
                      updateInputField('address', 'line_2', input)
                    }
                    colors={colors}
                  />

                  <Input
                    label="City"
                    placeholder="e.g. Cape Town"
                    autoCapitalize="none"
                    value={tempItem.city}
                    onChangeText={input =>
                      updateInputField('address', 'city', input)
                    }
                    colors={colors}
                  />

                  <Input
                    label="State province"
                    placeholder="e.g. Western Cape"
                    autoCapitalize="none"
                    value={tempItem.state_province}
                    onChangeText={input =>
                      updateInputField('address', 'state_province', input)
                    }
                    colors={colors}
                  />

                  <Input
                    label="Postal code"
                    placeholder="e.g. 9001"
                    autoCapitalize="none"
                    value={tempItem.postal_code}
                    onChangeText={input =>
                      updateInputField('address', 'postal_code', input)
                    }
                    colors={colors}
                  />
                </View>
              ) : line_1 || line_2 || city || state_province || postal_code ? (
                <View style={{ padding: 8 }}>
                  {line_1 ? (
                    <Output label="Address line 1" value={line_1} />
                  ) : null}
                  {line_2 ? (
                    <Output label="Address line 2" value={line_2} />
                  ) : null}
                  {city ? <Output label="City" value={city} /> : null}
                  {state_province ? (
                    <Output label="State province" value={state_province} />
                  ) : null}
                  {postal_code ? (
                    <Output label="Postal code" value={postal_code} />
                  ) : null}
                </View>
              ) : (
                <View style={{ padding: 8 }}>
                  <Output label="No address info saved" />
                </View>
              )}

              {/* <View style={[styles.pickerContainer, { paddingVertical: 20 }]}>
            <Text style={[styles.input, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ nationality: value.cca2 });
                }}
                closeable
                filterable
                cca2={nationality}
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View> */}
              {/* </InputContainer> */}
            </View>
          </Card>
        </CardContainer>

        {/* <View style={styles.pickerContainer}>
            <Text style={[styles.text, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ country: value.cca2 });
                }}
                cca2={country}
                closeable
                filterable
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View> */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    color: Colors.black,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
};

const mapStateToProps = ({ user, auth }) => {
  const { company_config } = auth;
  const { address, loading_address, tempItem, showDetail, updateError } = user;
  return {
    address,
    loading_address,
    tempItem,
    showDetail,
    updateError,
    company_config,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
})(AddressScreen);
