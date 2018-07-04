import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';

// import { store } from './../redux/store';
// const colors = store.getState().auth.company_config.colors;

import DrawerHeader from './../components/drawerHeader';
import colors from './../config/colors';

import HomeScreen from './../screens/main/homeScreen';

import WalletsScreen from '../screens/main/walletsScreen';

import GetVerifiedScreen from './../screens/settings/getVerified/getVerifiedScreen';
import SettingsScreen from './../screens/settings/settingsScreen';
import About from './../screens/main/aboutScreen';

const Stack = {
  Home: HomeScreen,
  Wallets: WalletsScreen,
  GetVerified: GetVerifiedScreen,
  Settings: SettingsScreen,
};

export default createDrawerNavigator(Stack, {
  drawerWidth: 200,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => (
    <View style={styles.container}>
      <View>
        <DrawerHeader navigation={props.navigation} colors={colors} />
      </View>

      <ScrollView>
        <DrawerItems
          {...props}
          activeTintColor={colors.secondaryContrast}
          activeBackgroundColor={colors.secondary}
          inactiveTintColor={colors.primary}
          inactiveBackgroundColor="transparent"
          labelStyle={{
            margin: 15,
            alignItems: 'center',
            fontSize: 16,
            fontWeight: 'normal',
          }}
        />
      </ScrollView>
    </View>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryContrast,
  },
});
