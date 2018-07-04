import React from 'react';
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { HeaderButton } from './HeaderButton';
import { Spinner } from './Spinner';
import Colors from './../../config/colors';

const PopUpGeneral = props => {
  const {
    backgroundStyle,
    containerStyle,
    viewStyleTitleContainer,
    viewStyleTitle,
    textStyleTitle,
    textStyleSubtitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    iconStyleTitleRight,
    viewStyleFooter,
    viewStyleContent,
    textStyleContent,
    textStyleError,
  } = styles;

  const {
    title,
    subtitle,
    iconTitleRight,
    onPressTitleRight,
    textActionOne,
    onPressActionOne,
    textActionTwo,
    onPressActionTwo,
    loading,
    titleStyle,
    children,
    contentText,
    visible,
    onDismiss,
    errorText,
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
      transparent>
      <TouchableHighlight
        style={backgroundStyle}
        onPress={onDismiss}
        underlayColor={'transparent'}>
        <View style={containerStyle}>
          <TouchableWithoutFeedback
            // style={containerStyle}
            onPress={() => {}}
            underlayColor={'transparent'}>
            <View>
              {title || iconTitleRight ? (
                <View
                  resizeMode="cover"
                  style={[
                    viewStyleTitleContainer,
                    // {
                    //   backgroundColor: titleStyle
                    //     ? Colors[titleStyle]
                    //     : Colors.primary,
                    // },
                  ]}>
                  <View style={viewStyleTitle}>
                    <Text
                      style={[
                        textStyleTitle,
                        {
                          fontSize: title ? (title.length < 15 ? 24 : 18) : 24,
                          // color: titleStyle
                          //   ? Colors[titleStyle + 'Contrast']
                          //   : Colors.primaryContrast,
                        },
                      ]}>
                      {title}
                    </Text>
                    <Text
                      style={[
                        textStyleSubtitle,
                        {
                          color: titleStyle
                            ? Colors[titleStyle + 'Contrast']
                            : Colors.primaryContrast,
                          opacity: 0.8,
                        },
                      ]}>
                      {subtitle}
                    </Text>
                  </View>
                  {iconTitleRight ? (
                    <View style={iconStyleTitleRight}>
                      <HeaderButton
                        icon={iconTitleRight}
                        onPress={onPressTitleRight}
                        color={
                          Colors.lightGray
                          // titleStyle
                          //   ? Colors[titleStyle + 'Contrast']
                          //   : Colors.primaryContrast
                        }
                      />
                    </View>
                  ) : null}
                </View>
              ) : null}
              <View style={viewStyleContent}>
                {contentText ? (
                  <Text style={textStyleContent}>{contentText}</Text>
                ) : null}
                {children}
                {errorText ? (
                  <Text style={textStyleError}>{errorText}</Text>
                ) : null}
              </View>

              {textActionOne || textActionTwo ? (
                <View style={viewStyleFooter}>
                  {loading ? (
                    <Spinner size="small" />
                  ) : (
                    <View style={viewStyleActionContainer}>
                      {textActionTwo ? (
                        <TouchableHighlight
                          onPress={onPressActionTwo}
                          underlayColor={Colors.lightGray}
                          style={buttonStyleAction}>
                          <Text style={textStyleAction}>{textActionTwo}</Text>
                        </TouchableHighlight>
                      ) : null}
                      {textActionOne ? (
                        <TouchableHighlight
                          onPress={onPressActionOne}
                          underlayColor={Colors.lightGray}
                          style={buttonStyleAction}>
                          <Text style={textStyleAction}>{textActionOne}</Text>
                        </TouchableHighlight>
                      ) : null}
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  viewStyleContent: {
    padding: 8,
  },
  viewStyleTitleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 48,
    paddingTop: 8,
    // paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // color: 'black',
    paddingHorizontal: 8,
    // flexGrow: 1,
    flex: 1,
    width: 0,
  },
  textStyleTitle: {
    color: Colors.primary,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  textStyleSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
  },
  textStyleContent: {
    fontSize: 16,
    padding: 8,
  },
  textStyleError: {
    paddingTop: 8,
    fontSize: 14,
    color: Colors.error,
  },
  iconStyleTitleRight: {
    right: -8,
    top: -8,
    margin: 0,
    // height: 48,
    // width: 48,
    position: 'absolute',
  },
  viewStyleFooter: {
    flexDirection: 'row',
    // height: 52,
    width: '100%',
    alignItems: 'center',
  },
  viewStyleActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 52,
    padding: 8,
  },
  textStyleAction: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    // padding: 8,
  },
  buttonStyleAction: {
    padding: 8,
    marginLeft: 8,
    // marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
};

export { PopUpGeneral };
