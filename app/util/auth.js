import { AsyncStorage } from 'react-native'
import resetNavigation from './resetNavigation'

const auth = {
  login: async (navigation, loginInfo) => {
    await AsyncStorage.setItem("token", loginInfo.token)
    await AsyncStorage.setItem("user", JSON.stringify(loginInfo.user))
    await resetNavigation.dispatchToSingleRoute(navigation, "Home")
  },
  logout: async (navigation) => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("user")
    resetNavigation.dispatchToSingleRoute(navigation, "InitialScreen")
  },
}

export default auth
