import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './../../components/header';

class CardsScreen extends Component {
  static navigationOptions = {
    title: 'Cards',
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Cards" />
        <Text>Cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CardsScreen;
