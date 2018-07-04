import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class Output extends Component {
  renderOutput() {
    const { label, value } = this.props;

    const {
      viewStyleLabel,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    return (
      <View>
        {value && label ? (
          <View style={viewStyleLabel}>
            <Text style={[textStyleLabel]}>{label}</Text>
          </View>
        ) : null}
        <View style={viewStyleValue}>
          <Text style={textStyleValue}>{value ? value : label}</Text>
        </View>
      </View>
    );
  }
  render() {
    const { goTo, gotoAddress, label } = this.props;

    const { viewStyleContainer } = styles;

    return (
      <View style={viewStyleContainer}>
        {goTo ? (
          <TouchableHighlight
            underlayColor={'white'}
            activeOpacity={0.2}
            onPress={() => goTo(gotoAddress, label)}>
            {this.renderOutput()}
          </TouchableHighlight>
        ) : (
          this.renderOutput()
        )}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    flexWrap: 'wrap',
    margin: 8,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
  },
  // touchable: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   height: 60,
  //   borderBottomWidth: 1,
  //   borderBottomColor: Colors.lightgray,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  textStyleLabel: {
    fontSize: 12,
    // paddingTop: 8,
    color: 'black',
    opacity: 0.6,
  },
  textStyleValue: {
    // height: 28,
    paddingLeft: 0,
    // paddingBottom: 8,
    paddingTop: 2,
    color: 'black',
    fontWeight: 'normal',
    // borderColor: 'white',
    // borderWidth: 1,
    flex: 1,
    // alignItems: 'center',
    fontSize: 16,
  },
};

export { Output };
