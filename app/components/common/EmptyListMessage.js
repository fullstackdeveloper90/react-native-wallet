import React from 'react';
import { View, Text } from 'react-native';
import Colors from './../../config/colors';

const EmptyListMessage = ({ text }) => {
  const { viewStyleContainer, viewStyleBox, textStyle } = styles;
  return (
    <View style={viewStyleContainer}>
      <View style={viewStyleBox}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  viewStyleBox: {
    flexDirection: 'column',
    backgroundColor: Colors.quaternary,
    padding: 16,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: Colors.onQuaternary,
  },
};

export { EmptyListMessage };
