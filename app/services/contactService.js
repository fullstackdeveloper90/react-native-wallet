import Expo from 'expo'
import { Alert } from 'react-native'

var contactService = {
  getAllContacts: async () => {
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS)
    if (permission.status !== 'granted') {
      Alert.alert(
        'Error',
        'Permission denied'
      )
      return
    }
    const getTotal = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
        Expo.Contacts.THUMBNAIL,
      ],
      pageSize: 60,
      pageOffset: 0,
    })

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
        Expo.Contacts.THUMBNAIL,
      ],
      pageSize: getTotal.total,
      pageOffset: 0,
    })

    //console.log(contacts)

    var data = []
    var alreadyAdded = []
    contacts.data.forEach((node) => {
      var thumbnail = node.thumbnail?node.thumbnail.uri:null;
      if (typeof (node.phoneNumbers) !== "undefined") {
        node.phoneNumbers.forEach((number) => {
          var mobile = number.number
          mobile = mobile.replace(/\s/g, '')
          if(alreadyAdded.indexOf(mobile)==-1){
            var newData = {
              name: node.name,
              contact: mobile,
              image: thumbnail,
            }
            data.push(newData)
            alreadyAdded.push(mobile)
          }
        })
      }
      if (typeof (node.emails) !== "undefined") {
        node.emails.forEach((email) => {
          var address =  email.email
          if(alreadyAdded.indexOf(address)==-1){
            var newData = {
              name: node.name,
              contact: address,
              image: thumbnail,
            }
            data.push(newData)
            alreadyAdded.push(address)
          }
        })
      }
    })

    data = data.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      else if (a.name > b.name) {
        return 1
      }
      else {
        return 0
      }
    })

    return data
  },
}

export default contactService
