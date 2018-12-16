import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { ListItem } from 'native-base';
import styles from '../screens/CardStylesheet';
import Stars from '../components/Stars';

const MAX_LOCATION_CHARS = 48; // max number of characters displayed for locations list

function formatCities(cities) {
  let locations = cities.reduce((s, c) => s + `${c.name}, `, '').slice(0, -2);
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
                  this.props.school.logo_url
              }}
            />
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

export default SchoolCard;
