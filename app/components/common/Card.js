import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';
import TouchableCircle from './../touchableCircle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-swipeable';

const Card = props => {
  const {
    viewStyleCardContainer,
    viewStyleTitleContainer,
    viewStyleTitle,
    textStyleTitle,
    textStyleSubtitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    textStyleError,
    iconStyleTitleRight,
    viewStyleFooter,
    viewStyleContent,
    iconStyleFooter,
  } = styles;

  const {
    renderHeader,
    title,
    subtitle,
    colorTitleBackground,
    colorTitleText,
    iconTitleLeft,
    onPressTitle,
    itemCode,
    itemActive,
    textTitleLeft,
    onPressTitleLeft,
    iconTitleRight,
    onPressTitleRight,
    backgroundColor,
    onPressContent,
    colorIcon,
    errorText,
    iconFooter,
    onPressFooter,
    textActionOne,
    onPressActionOne,
    disableActionOne,
    textActionTwo,
    onPressActionTwo,
    disableActionTwo,
    loading,
    swipeableContent,
  } = props;

  return (
    <View style={viewStyleCardContainer}>
      {/* <Swipeable rightContent={swipeableContent}> */}
      {renderHeader ? <View>{renderHeader}</View> : null}
      {title || subtitle || iconTitleLeft || iconTitleRight ? (
        <View
          resizeMode="cover"
          style={[
            viewStyleTitleContainer,
            { backgroundColor: colorTitleBackground },
          ]}>
          {textTitleLeft ? (
            <TouchableCircle
              text={textTitleLeft}
              active={itemActive}
              onPress={onPressTitleLeft}
              radius={24}
            />
          ) : null}
          {iconTitleLeft ? (
            <HeaderButton
              name={iconTitleLeft}
              onPress={onPressTitleLeft}
              color={colorTitle ? colorTitle : Colors.primaryContrast}
            />
          ) : null}
          <TouchableWithoutFeedback onPress={onPressTitle}>
            <View style={viewStyleTitle}>
              <Text
                style={[
                  textStyleTitle,
                  {
                    fontSize: title ? (title.length < 18 ? 24 : 18) : 24,
                    color: colorTitleText,
                  },
                ]}>
                {title}
              </Text>
              {subtitle ? (
                <Text style={[textStyleSubtitle, { color: colorTitleText }]}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
          {iconTitleRight ? (
            <View style={iconStyleTitleRight}>
              <HeaderButton
                icon={iconTitleRight}
                onPress={onPressTitleRight}
                color={colorTitle ? colorTitle : Colors.primaryContrast}
              />
            </View>
          ) : null}
        </View>
      ) : null}
      <TouchableWithoutFeedback onPress={onPressContent}>
        <View style={[viewStyleContent, { backgroundColor }]}>
          {props.children}
          {errorText ? <Text style={textStyleError}>{errorText}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
      {textActionOne || textActionTwo || iconFooter ? (
        <View style={[viewStyleFooter, { backgroundColor }]}>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <View style={viewStyleActionContainer}>
              {iconFooter ? (
                <Icon
                  style={iconStyleFooter}
                  name={iconFooter}
                  size={22}
                  onPress={onPressFooter}
                  color={colorIcon ? colorIcon : Colors.gray}
                />
              ) : null}
              {textActionTwo ? (
                <TouchableHighlight
                  disabled={disableActionTwo}
                  underlayColor={Colors.lightGray}
                  style={buttonStyleAction}
                  onPress={onPressActionTwo}>
                  <Text style={textStyleAction}>{textActionTwo}</Text>
                </TouchableHighlight>
              ) : null}
              {textActionOne ? (
                <TouchableHighlight
                  disabled={disableActionOne}
                  underlayColor={Colors.lightGray}
                  style={buttonStyleAction}
                  onPress={onPressActionOne}>
                  <Text style={textStyleAction}>{textActionOne}</Text>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
        </View>
      ) : null}
      {/* </Swipeable> */}
    </View>
  );
  {
    /* <View style={styles.containerStyle}>{props.children}</View>; */
  }
};

Card.defaultProps = {
  title: '',
  subtitle: '',
  renderHeader: null,
  animation: 'fadeInDownBig',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  colorTitleBackground: Colors.secondary,
  colorTitleText: Colors.secondaryContrast,
  backgroundColor: 'white',
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  renderHeader: PropTypes.object,
  animation: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

const styles = {
  viewStyleCardContainer: {
    borderRadius: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 8,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  viewStyleTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    // height: 72,
    padding: 8,
    alignItems: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  textStyleTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  textStyleSubtitle: {
    opacity: 0.6,
    fontSize: 12,
  },
  viewStyleContent: {
    // paddingTop: 8,
    // paddingHorizontal: 8,
  },
  iconStyleTitleLeft: {
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    color: 'black',
    opacity: 0.87,
  },
  iconStyleTitleRight: {
    right: 0,
    height: 64,
    width: 64,
    position: 'absolute',
  },
  iconStyleFooter: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    padding: 8,
  },
  textStyleError: {
    paddingTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.error,
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

// const mapStateToProps = ({ user }) => {
//   const { company_config } = user;
//   return { company_config };
// };

// connect(mapStateToProps, {})(props => Card(props));

export { Card };
