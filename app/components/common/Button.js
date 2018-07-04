/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from './../../config/colors';

class Button extends Component {
  buttonStyle() {
    const { buttonStyle } = styles;
    const { backgroundColor, size } = this.props;
    return [
      buttonStyle,
      {
        backgroundColor,
        height: size === 'large' ? 40 : size === 'small' ? 30 : 36,
      },
    ];
  }

  textStyle() {
    const { textStyle } = styles;
    const { size, textColor } = this.props;
    return [
      textStyle,
      {
        color: textColor,
        fontSize: size === 'large' ? 18 : size === 'small' ? 10 : 14,
      },
    ];
  }

  render() {
    const {
      onPress,
      label,
      reference,
      animation,
      disabled,
      size,
      icon,
    } = this.props;
    const { containerStyle } = styles;
    return (
      <Animatable.View
        ref={reference}
        style={containerStyle}
        animation={animation}>
        <TouchableOpacity
          onPress={onPress}
          style={this.buttonStyle()}
          disabled={disabled}>
          <View style={{ flexDirection: 'row' }}>
            {icon ? (
              <Icon
                name={icon}
                size={size === 'large' ? 26 : size === 'small' ? 18 : 22}
                color={textColor}
              />
            ) : null}
            <Text style={this.textStyle()}>{label}</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string, // Text displayed on button
  reference: PropTypes.func, // For animations
  animation: PropTypes.string, // Animation type
  disabled: PropTypes.bool, // Disable touchable component
  onPress: PropTypes.func, // Function to execute on press
  icon: PropTypes.string, // Icon displayed on left of button
  size: PropTypes.string, // Size of button (small / default or '' / large)
  type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
  backgroundColor: PropTypes.string, // Button color
  textColor: PropTypes.string, // Text color
};

Button.defaultProps = {
  label: '',
  reference: () => {},
  animation: '',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  backgroundColor: Colors.primary,
  textColor: Colors.primaryContrast,
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    margin: 8,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 2.5,
    minWidth: 64,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export { Button };
