import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

class SchoolCard extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.school.name}</Text>
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
  }
});

export default SchoolCard;
