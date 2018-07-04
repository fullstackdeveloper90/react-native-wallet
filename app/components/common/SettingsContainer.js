import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from './../../config/colors';

class SettingsContainer extends Component {
  render() {
    const { label, children } = this.props;

    const {
      viewStyleContainer,
      viewStyleChildren,
      viewStyleLabel,
      textStyleLabel,
    } = styles;

    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleLabel}>
          <Text style={textStyleLabel}>{label}</Text>
        </View>
        {/* {children} */}
        <View style={viewStyleChildren}>{children}</View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  viewStyleLabel: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    marginBottom: 4,
    paddingBottom: 4,
    borderColor: Colors.lightGray,
  },
  viewStyleChildren: {
    flexDirection: 'column',
  },
  textStyleLabel: {
    fontSize: 22,
    paddingTop: 8,
    color: 'black',
    paddingLeft: 8,
    opacity: 0.86,
    // color: Colors.lightGray,
  },
};

export { SettingsContainer };
