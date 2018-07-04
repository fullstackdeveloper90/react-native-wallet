import React, { Component } from 'react';
import { Font } from 'expo';
import { createIconSet } from '@expo/vector-icons';
const glyphMap = {
  send: 'B',
  receive: 'A',
  more: 'z',
  deposit: 'z',
  withdraw: 'D',
  loading: 'C',
};
const CustomIconSet = createIconSet(glyphMap, 'FontName');

class CustomIcon extends Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      FontName: require('./../../../assets/fonts/rehive-icon-font.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    const { name, size, color } = this.props;
    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <CustomIconSet name={name} size={size} color={color ? color : 'black'} />
    );
  }
}

export { CustomIcon };
