import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { connect } from 'react-redux';

class DrawerHeader extends Component {
  render() {
    const { profile, colors } = this.props;
    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
      textStyleEmail,
    } = styles;
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate('SettingsPersonalDetails')
        }>
        <View style={[viewStyleContainer, { backgroundColor: colors.primary }]}>
          <Image
            style={[imageStylePhoto, { borderColor: colors.secondary }]}
            source={
              profile.profile
                ? {
                    uri: profile.profile,
                    // cache: 'only-if-cached',
                  }
                : require('./../../assets/icons/profile.png')
            }
          />
          <View style={viewStyleName}>
            <Text style={[textStyleName, { color: colors.primaryContrast }]}>
              {profile.first_name
                ? profile.first_name + ' ' + profile.last_name
                : profile.username}
            </Text>
            <Text style={[textStyleEmail, { color: colors.primaryContrast }]}>
              {profile.email || ''}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  viewStyleContainer: {
    paddingTop: 48,
    padding: 16,
    paddingBottom: 8,
  },
  imageStylePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
  },
  viewStyleName: {
    paddingVertical: 12,
  },
  textStyleName: {
    fontSize: 14,
    paddingBottom: 4,
    fontWeight: 'bold',
  },
  textStyleEmail: {
    fontSize: 14,
  },
};

const mapStateToProps = ({ user }) => {
  const { profile } = user;
  return { profile };
};

export default connect(mapStateToProps, {})(DrawerHeader);
