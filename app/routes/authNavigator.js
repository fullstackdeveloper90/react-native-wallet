import { createStackNavigator } from 'react-navigation';

import AuthScreen from './../screens/auth/authScreen';
import Logout from './../screens/auth/logoutScreen';

const Stack = {
  AuthScreen: AuthScreen,
  Logout: Logout,
};

export default createStackNavigator(Stack, {
  headerMode: 'none',
});
