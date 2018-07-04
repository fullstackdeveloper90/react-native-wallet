import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { cardDismiss, cardRestoreAll } from './../redux/actions';

// import { AreaChart, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';

import { CardContainer, Card, Button } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeCards extends Component {
  // renderChart() {
  //   const data = [
  //     50,
  //     10,
  //     40,
  //     95,
  //     -4,
  //     -24,
  //     85,
  //     91,
  //     35,
  //     53,
  //     -53,
  //     24,
  //     50,
  //     -20,
  //     -80,
  //   ];

  //   return (
  //     <AreaChart
  //       style={{ height: 200 }}
  //       data={data}
  //       contentInset={{ top: 30, bottom: 30 }}
  //       curve={shape.curveNatural}
  //       svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}>
  //       <Grid />
  //     </AreaChart>
  //   );
  // }

  renderImage(image) {
    return <Image style={styles.imageStylePhoto} source={image} />;
  }

  renderCards() {
    const { profile, company_config, dismissedCards } = this.props;
    // add welcome card
    let cards = [];
    let i = 0;
    if (!dismissedCards || !dismissedCards.includes('welcome')) {
      cards[i++] = {
        id: 'welcome',
        title: 'Welcome to Rehive',
        description: 'A multi-currency wallet built on the Rehive platform.',
        image: 'card1',
        dismiss: true,
      };
    }

    if (profile.verified) {
      cards[i++] = {
        id: 'verify',
        description: 'Please verify your account',
        image: 'card2',
        actionLabel: 'GET VERIFIED',
        navigate: 'GetVerified',
      };
    }
    if (company_config && company_config.cards) {
      for (let j = 0; j < company_config.cards.length; j++) {
        if (
          !dismissedCards ||
          !dismissedCards.includes(company_config.cards[j].id)
        ) {
          cards[i++] = company_config.cards[j];
        }
      }
    }

    return (
      <FlatList
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loadingData}
        //     onRefresh={() => fetchData(type)}
        //   />
        // }
        keyboardShouldPersistTaps="always"
        data={cards}
        renderItem={({ item }) => this.renderCard(item)}
        keyExtractor={item => (item.id ? item.id.toString() : null)}
        ListFooterComponent={this.renderFooter()}
      />
    );
  }

  renderCard(item) {
    const { textStyleContent } = styles;
    const { company_config } = this.props;
    let imageString = './../../assets/icons/' + item.image + '.png';
    return (
      <Card
        key={item.id}
        title={item.title}
        renderHeader={this.renderImage(
          require('./../../assets/icons/card1.png'),
        )}
        colorTitleBackground={company_config.colors.primary}
        colorTitleText={company_config.colors.primaryContrast}
        onPressActionOne={() =>
          item.navigate
            ? this.props.navigation.navigate(item.navigate)
            : item.dismiss ? this.props.cardDismiss(item.id) : null
        }
        textActionOne={
          item.actionLabel ? item.actionLabel : item.dismiss ? 'DISMISS' : ''
        }>
        {item.description ? (
          <Text style={textStyleContent}>{item.description}</Text>
        ) : null}
      </Card>
    );
  }

  renderFooter() {
    const { dismissedCards, cardRestoreAll } = this.props;
    const { viewStyleFooter } = styles;
    if (dismissedCards && dismissedCards.length > 0) {
      return (
        <View style={viewStyleFooter}>
          <Button label="RESTORE ALL" type="text" onPress={cardRestoreAll} />
        </View>
      );
    }
  }

  render() {
    return <CardContainer>{this.renderCards()}</CardContainer>;
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  imageStylePhoto: {
    width: SCREEN_WIDTH - 16,
    height: 150,
  },
  textStyleContent: {
    fontSize: 16,
    padding: 8,
    paddingHorizontal: 16,
  },
  viewStyleFooter: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = ({ auth, user }) => {
  const { company_config } = auth;
  const { profile, dismissedCards } = user;
  return { company_config, profile, dismissedCards };
};

export default connect(mapStateToProps, { cardDismiss, cardRestoreAll })(
  HomeCards,
);
