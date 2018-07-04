// import lib for making component
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// make component
const Spinner = ({ size }) => {
  return (
    <View style={styles.containerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// make component available to other parts of app
export { Spinner };
