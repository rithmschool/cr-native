import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'expo';

class Stars extends Component {
  render() {
    console.log('STARS IS', this.props);
    let platform = Platform.OS === 'ios' ? `ios` : 'md';

    let rating = this.props.rating;
    let size = this.props.size;

    let numFullStars = Math.floor(rating);
    let partialStar = rating - numFullStars;
    let numEmptyStars = 5 - Math.ceil(rating);

    if (partialStar >= 0.8) {
      partialStar = <Icon.Ionicons name={`${platform}-star`} size={size} />;
    } else if (partialStar >= 0.4) {
      partialStar = (
        <Icon.Ionicons name={`${platform}-star-half`} size={size} />
      );
    } else if (partialStar > 0) {
      partialStar = (
        <Icon.Ionicons name={`${platform}-star-outline`} size={size} />
      );
    }

    let fullStarsArray = Array(numFullStars).fill(
      <Icon.Ionicons name={`${platform}-star`} size={size} />
    );
    let emptyStarsArray = Array(numEmptyStars).fill(
      <Icon.Ionicons name={`${platform}-star-outline`} size={size} />
    );

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
