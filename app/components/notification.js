import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import Colors from './../config/colors'

export default class Notification extends Component {

  constructor(props) {
    super(props)

    this.state = {
      switchValue: this.props.switchValue,
    }
  }

  valueChanged = (value) => {
    this.setState({
      switchValue: value,
    })
    this.props.toggleValue(this.props.data.id, value)
  }

  render() {
    return (
      <View
        style={styles.options} >
        <View style={styles.optionsElement}>
          <Text style={{ fontSize: 18, color: Colors.black }}>
            {this.props.data.description}
          </Text>
        </View>
        <View style={styles.switch}>
          <Switch onValueChange={(value) => this.valueChanged(value)} value={this.state.switchValue} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    height: 80,
    width: "100%",
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
  },
  optionsElement: {
    flex: 3,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  switch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
