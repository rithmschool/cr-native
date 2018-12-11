import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import uuid from 'uuid/v4';

class Stars extends Component {
  render() {
    let platform = Platform.OS === 'ios' ? `ios` : 'md';

    let rating = this.props.rating;
    let size = this.props.size;

    let numFullStars = Math.floor(rating);
    let partialStar = rating - numFullStars;
    let numEmptyStars = 5 - Math.ceil(rating);

    if (partialStar >= 0.8) {
      partialStar = (
        <Icon.Ionicons key={uuid()} name={`${platform}-star`} size={size} />
      );
    } else if (partialStar >= 0.4) {
      partialStar = (
        <Icon.Ionicons
          key={uuid()}
          name={`${platform}-star-half`}
          size={size}
        />
      );
    } else if (partialStar > 0) {
      partialStar = (
        <Icon.Ionicons
          key={uuid()}
          name={`${platform}-star-outline`}
          size={size}
        />
      );
    }

    let fullStarsArray = Array(numFullStars)
      .fill(1)
      .map(num => (
        <Icon.Ionicons key={uuid()} name={`${platform}-star`} size={size} />
      ));
    let emptyStarsArray = Array(numEmptyStars)
      .fill(1)
      .map(num => (
        <Icon.Ionicons
          key={uuid()}
          name={`${platform}-star-outline`}
          size={size}
        />
      ));

    let allStars =
      partialStar === 0
        ? [...fullStarsArray, ...emptyStarsArray]
        : [...fullStarsArray, partialStar, ...emptyStarsArray];

    return (
      <View style={styles.container}>
        <Text>{allStars}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});

export default Stars;
