import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { ListItem } from 'native-base';
import Stars from '../components/Stars';

const MAX_LOCATION_CHARS = 48; // max number of characters displayed for locations list

function formatCities(cities) {
  let locations = cities.reduce((s, c) => s + `${c}, `, '').slice(0, -2);
  if (locations.length > MAX_LOCATION_CHARS)
    locations = locations.slice(0, MAX_LOCATION_CHARS).concat('...');
  return locations;
}

class SchoolCard extends React.Component {
  _handleButton = () => {
    this.props.navigate();
  };

  render() {
    let locations = formatCities(this.props.school.cities);
    return (
      <ListItem style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => this._handleButton(this.props.school.id)}
          style={styles.cardContainer}
        >
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{this.props.school.name}</Text>
            </View>
            <View style={styles.row}>
              <Stars rating={this.props.school.avg_review_rating} size={20} />
            </View>
            <View style={styles.row}>
              <Text style={styles.cardText}>
                <Text style={styles.cardTextLabel}>Locations: </Text>
                {locations}
              </Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://www.rithmschool.com/assets/logos/300logo-e647a12a86a37452242b8a21b69d9d1dc4062424c1aba75e17ca49ba66787120.jpg'
              }}
            />
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  cardTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5
  },
  cardTextLabel: {
    color: 'black',
    textAlign: 'left',
    paddingVertical: 5
  },
  cardBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '70%',
    paddingLeft: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto'
  },
  image: {
    margin: 20,
    width: 70,
    height: 70
  }
});

export default SchoolCard;
