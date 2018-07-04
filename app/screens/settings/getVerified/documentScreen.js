import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { uploadDocument } from './../../../redux/actions';
import Header from './../../../components/header';

import * as Rehive from './../../../util/rehive';

import SettingsService from './../../../services/settingsService';
import {
  ImageUpload,
  Button,
  Spinner,
  ButtonList,
} from '../../../components/common';
import document_categories from './../../../config/document_types.json';

class DocumentScreen extends Component {
  static navigationOptions = {
    title: 'Documents',
  };

  state = {
    document_type: '',
    state: '',
    category: '',
    showModal: false,
  };

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    this.setState({
      document_type: '',
      state: 'document_type',
      category: this.props.navigation.state.params.name,
    });
  }

  selectType = document_type => {
    this.setState({
      showModal: true,
      document_type,
    });
  };

  uploadDocument() {
    const { image, category, document_type } = this.state;
    this.props.uploadDocument(image, category, document_type);
  }

  renderContent() {
    const { category, state } = this.state;
    const {
      textStyleDescription,
      viewStyleButtonContainer,
      viewStyleImageContainer,
    } = styles;
    let options;

    let document_category = document_categories.filter(
      document_category => document_category.document_category === category,
    );
    if (category) {
      options = document_category[0].document_types;
    }

    switch (state) {
      case 'document_type':
        return (
          <View>
            <Text style={textStyleDescription}>
              Please upload one of the following documents.{' '}
              {category === 'Proof of Address'
                ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
                : ''}
            </Text>
            {/* <ButtonList> */}
            <FlatList
              contentContainerStyle={viewStyleButtonContainer}
              data={options}
              renderItem={({ item }) => this.renderTypeButton(item)}
              keyExtractor={item => item.id.toString()}
            />
            {/* </ButtonList> */}
          </View>
        );
      case 'confirm':
        return (
          <View>
            <View style={viewStyleImageContainer}>
              <Image
                style={{ height: 300, width: 300 }}
                source={{ uri: this.state.image }}
              />
            </View>
            {this.props.loading ? (
              <Spinner size="large" />
            ) : (
              <View style={{ paddingHorizontal: 24 }}>
                <Button label="Upload" onPress={() => this.uploadDocument()} />
                <Button label="Cancel" onPress={() => this.resetState()} />
              </View>
            )}
          </View>
        );
    }
  }

  renderTypeButton = item => {
    return (
      <Button
        label={item.description}
        // size="small"
        onPress={() => this.selectType(item.document_type)}
      />
    );
  };

  render() {
    const { category } = this.state;
    const { textStyleHeader, viewStyleContent } = styles;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Documents" />
        <View style={viewStyleContent}>
          <Text style={textStyleHeader}>{category}</Text>
          {this.renderContent()}
        </View>

        <ImageUpload
          visible={this.state.showModal}
          onSave={image =>
            this.setState({
              image,
              state: 'confirm',
            })
          }
          onDismiss={() => this.setState({ showModal: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // backgroundColor: 'white',
  },
  viewStyleContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  viewStyleButtonContainer: {
    // width: '100%',
    paddingVertical: 8,
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 8,
    // paddingTop: 12,
    // padding: 16,
    // marginBottom: 16,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    padding: 8,
    // flexWrap: 'wrap',
    // paddingBottom: 8,
    textAlign: 'center',
  },
});

const mapStateToProps = user => {
  const { loading } = user;
  return { loading };
};

export default connect(mapStateToProps, {
  uploadDocument,
})(DocumentScreen);
