import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

class Checkbox extends Component {
  render() {
    const {
      onPress,
      value,
      label,
      link,
      linkLabel,
      requiredError,
    } = this.props;
    const {
      textStyle,
      viewStyleContainer,
      viewStyleContainerCheckbox,
      textStyleLink,
      textStyleRequired,
    } = styles;
    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleContainerCheckbox}>
          <Icon
            onPress={onPress} //value ? {this.setState({ value })} : 'square-outline'}
            name={value ? 'checkbox' : 'square-outline'}
            size={30}
            color={value ? Colors.primary : Colors.lightgray}
          />
          <Text style={textStyle}>{label}</Text>
          <TouchableOpacity onPress={() => Linking.openURL({ link })}>
            <Text style={textStyleLink}>{linkLabel}</Text>
          </TouchableOpacity>
          <Text style={textStyleRequired}>{requiredError}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  viewStyleContainerCheckbox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.black,
    paddingLeft: 8,
    paddingRight: 4,
    fontSize: 16,
  },
  textStyleLink: {
    color: Colors.lightblue,
    fontSize: 16,
  },
  textStyleRequired: {
    color: Colors.red,
    paddingRight: 5,
    flexWrap: 'wrap',
  },
};

// make component available to other parts of app
export { Checkbox };
