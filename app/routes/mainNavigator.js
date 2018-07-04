import { createSwitchNavigator } from 'react-navigation';
import authNavigator from './authNavigator';
import appNavigator from './appNavigator';

export default createSwitchNavigator(
  {
    Auth: authNavigator,
    App: appNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);
