import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './../../components/header';

class SocialNetworksScreen extends Component {
  static navigationOptions = {
    title: 'Social networks',
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Social networks"
        />
        <Text>Social Networks</Text>
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

export default SocialNetworksScreen;
