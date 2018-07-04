import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Linking } from 'react-native';
import UserInfoService from './../../services/userInfoService';
import Colors from './../../config/colors';
import Header from './../../components/header';
import AppConfig from './../../../app.json';

class AboutScreen extends Component {
  static navigationOptions = {
    title: 'About',
  };

  constructor(props) {
    super(props);

    this.state = {
      company: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let responseJson = await UserInfoService.getCompany();
    if (responseJson.status === 'success') {
      this.setState({
        company: responseJson.data,
      });
    } else {
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  openLink = () => {
    Linking.canOpenURL(this.state.company.website).then(supported => {
      if (supported) {
        Linking.openURL(this.state.company.website);
      } else {
        Alert.alert(
          'Error',
          "Don't know how to open URI: " + this.state.company.website,
          [{ text: 'OK' }],
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="About" />
        <View style={styles.details}>
          <Text style={{ fontSize: 30, color: Colors.black }}>
            {this.state.company.name}
          </Text>
          <View style={styles.description}>
            <Text style={{ fontSize: 20, color: Colors.black }}>
              {this.state.company.description}
            </Text>
            <Text
              style={{ fontSize: 20, color: Colors.darkblue }}
              onPress={this.openLink}>
              (link)
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: Colors.black }}>
            Version: {AppConfig.version}
          </Text>
        </View>
        <View style={styles.logo}>
          {this.state.company.logo !== null ? (
            <Image
              style={{ width: 200, height: 100 }}
              source={{ uri: this.state.company.logo }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  description: {
    flexDirection: 'row',
    marginTop: 5,
  },
  details: {
    height: 150,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.lightgray,
  },
  logo: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default AboutScreen;
