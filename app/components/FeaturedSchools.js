import React from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { Button } from 'native-base';
import Stars from './Stars';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 420;//height expanded so school dots dont run onto the dots on the bottom
const MAX_LOCATION_CHARS = 10000000; // max number of characters displayed for locations list. this feature was set to a very large number to dispaly all the text.

//function formats the location into an array that has a readable format.
function formatCities(cities) {
  let locations = cities.reduce((s, c) => s + `${c.name}, `, '').slice(0, -2);
  if (locations.length > MAX_LOCATION_CHARS)
    locations = locations.slice(0, MAX_LOCATION_CHARS).concat('...');
  return locations;
}

export default class FeaturedSchools extends React.Component {
  //renders the school block.
  renderPage(school) {
    let locations = formatCities(school.cities);
    return (
      <Button
        block
        light
        style={styles.button}
        onPress={() =>
          this.props.navigation.navigate('School', { id: school.id })
        }
        key={school.id}
      >
        <View style={styles.imageParent}>
          <Image
            style={styles.image}
            source={{
              uri: school.logo_url
            }}
          />
          <Text style={styles.name}>{school.name}</Text>
          <Stars rating={school.avg_review_rating} size={20} />
          <Text>{school.review_count} reviews</Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardTextLabel}>Locations: </Text>
            {locations}
          </Text>
        </View>
      </Button>
    );
  }
  //renders the carousel
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {this.props.featuredSchools.map(school => this.renderPage(school))}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignContent: 'center'
  },
  container: {
    flex: 1
  },
  cardText: {
    marginTop: 20
  },
  cardTextLabel: {
    fontFamily: 'open-sans-regular'
  },
  name: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 35,
    paddingVertical: 15,
    textAlign: 'center',
    fontFamily: 'share-tech'
  },
  reviewTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 15
  },
  image: {
    width: 100,
    height: 100,
    margin: 15
  },
  imageParent: {
    alignItems: 'center',
    height: BannerHeight,
    paddingHorizontal: 20,
    marginTop: 40
  },
  button: {
    height: BannerHeight,
    padding: 30
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  about: {
    textAlign: 'left',
    color: 'gray',
    fontSize: 14,
    paddingVertical: 35
  },
  title: {
    textAlign: 'center',
    color: '#4F922F',
    fontSize: 20,
    paddingVertical: 35
  }
});
