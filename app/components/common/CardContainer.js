// import lib for making component
import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';

// make component
const CardContainer = props => {
  return (
    <KeyboardAvoidingView
      style={styles.containerStyle}
      behavior={'padding'}
      enabled>
      <ScrollView
        // style={containerStyle}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps="always">
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    // alignItems: 'stretch',
    // paddingVertical: 16,
    // padding: 8,
    // paddingBottom: 10,
    // marginTop: 8,
  },
};

// make component available to other parts of app
export { CardContainer };
