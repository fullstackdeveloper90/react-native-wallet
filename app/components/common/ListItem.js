import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Colors from './../../config/colors';

class ListItem extends Component {
  render() {
    const {
      viewStyleContainer,
      viewStyleImage,
      viewStyleTitle,
      textStyleTitle,
      textStyleSubtitle,
    } = styles;
    const { image, title, subtitle } = this.props;
    return (
      <TouchableHighlight
        underlayColor={'white'}
        onPress={item => this.props.onPress(item)}>
        <View style={viewStyleContainer}>
          <View style={viewStyleImage}>
            {image ? (
              <Image
                style={{ height: 32, width: 32, borderRadius: 16 }}
                source={{
                  uri: image,
                  cache: 'only-if-cached',
                }}
              />
            ) : (
              <Image
                source={require('./../../../assets/icons/profile.png')}
                style={{ height: 32, width: 32 }}
              />
            )}
          </View>
          <View style={viewStyleTitle}>
            <Text style={textStyleTitle}>{title}</Text>
            <Text style={textStyleSubtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  viewStyleContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 40,
  },
  viewStyleImage: {
    width: 56,
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  viewStyleTitle: {
    justifyContent: 'center',
  },
  textStyleTitle: {
    fontSize: 18,
    color: Colors.black,
  },
  textStyleSubtitle: {
    fontSize: 12,
    color: Colors.black,
  },
};

export { ListItem };
