import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

class SchoolCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={{ uri: this.props.school.logo_url }}
          style={styles.image}
        /> */}
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: this.props.school.logo_url
          }}
        />
        <Text>{this.props.school.logo_url}</Text>
        <Text>{this.props.school.name}</Text>
        <Text>{this.props.school.avg_review_rating}</Text>
        <Text>{this.props.school.cities}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  card: {
    textAlign: 'center',
    padding: 10,
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightgrey'
  },
  cardContainer: {
    marginVertical: 10,
    width: '100%',
    height: 'auto'
  },
  image: {
    width: 50,
    height: 50
  }
});

export default SchoolCard;
