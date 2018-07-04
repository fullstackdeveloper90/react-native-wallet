import { NetInfo, Alert  } from 'react-native'
import resetNavigation from './resetNavigation'

const netInfo = {
  check: async (navigation) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      
      if (isConnected) {
        NetInfo.isConnected.addEventListener(
          'change',
          handleConnectivityChange
        );
      }
      else {
        navigation.navigate("NoNetConnection")
      }
    });
    function handleConnectivityChange(isConnected) {
      if (isConnected) {
        
      }
      else {
        navigation.navigate("NoNetConnection")
      }
    }
  },

  getInfo : async () => {
    return NetInfo.isConnected.fetch()
  },
}

export default netInfo
