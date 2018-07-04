import React, { Component } from 'react';
import { ImagePicker, Permissions } from 'expo';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PopUpGeneral } from './PopUpGeneral';
import { ButtonList } from './ButtonList';
import { Button } from './Button';

class ImageUpload extends Component {
  state = {
    image: '',
    loading: false,
  };

  launchCamera = async () => {
    Permissions.askAsync(Permissions.CAMERA);
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      // aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.props.onSave(result.uri);
      this.props.onDismiss();
      // this.setState({
      //   image: result.uri,
      // });
    }
  };

  launchImageLibrary = async () => {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
    });
    if (!result.cancelled) {
      this.props.onSave(result.uri);
      this.props.onDismiss();
      // this.setState({
      //   image: result.uri,
      // });
    }
  };

  render() {
    const { visible, onDismiss } = this.props;

    return (
      <PopUpGeneral visible={visible} onDismiss={onDismiss}>
        <ButtonList>
          <Button
            label="Use camera"
            onPress={this.launchCamera} //this.openModal(item.document_type)}
          />
          <Button
            label="Choose from gallery"
            onPress={this.launchImageLibrary} //this.openModal(item.document_type)}
          />
          <Button
            type="text"
            label="Cancel"
            onPress={() => onDismiss()} //this.openModal(item.document_type)}
          />
        </ButtonList>
      </PopUpGeneral>
    );
  }
}

const styles = {
  viewStyleContainer: {},
};

export { ImageUpload };
