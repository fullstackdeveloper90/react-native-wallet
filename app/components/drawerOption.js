import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class DrawerOption extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.options}
        onPress={() => this.props.navigation.navigate(this.props.gotoAddress)}>
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'normal' }}>
          {this.props.name}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 15,
    width: '100%',
  },
});
