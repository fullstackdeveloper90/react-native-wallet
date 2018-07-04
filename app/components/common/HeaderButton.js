import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderButton = ({ onPress, icon, text, color, size }) => (
  <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
    {icon ? (
      <Icon
        name={icon}
        size={size ? size : 24}
        color={color ? color : 'white'}
      />
    ) : (
      <Text
        style={{ fontSize: size ? size : 16, color: color ? color : 'white' }}>
        {text}
      </Text>
    )}
  </TouchableOpacity>
);

styles = {
  containerStyle: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export { HeaderButton };
