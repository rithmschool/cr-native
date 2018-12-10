import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import axios from 'axios';

const BASE_URL = 'http://192.168.1.227:3001';

class SchoolScreen extends Component {
  state = {
    school: {},
    loading: true
  };

  async componentDidMount() {
    try {
      let schoolId = this.props.navigation.getParam('id');
      //do the axios call to get the data for an individual school
      let resp = await axios.get(`${BASE_URL}/schools/${schoolId}`);
      this.setState({ school: resp.data.school, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#4F922F"
          style={styles.activityIndicator}
        />
      );
    }

    let reviews = this.state.school.reviews.map(review => (
      <Text>{review.body}</Text>
    ));

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.name}>{this.state.school.name}</Text>
        <View style={styles.imageParent}>
          <Image
            style={styles.image}
            source={{
              uri: this.state.school.logo
            }}
          />
          {this.state.school.avg_review_rating ? (
            <Text>{this.state.school.avg_review_rating} stars</Text>
          ) : (
            <Text />
          )}
          <Text>{this.state.school.review_count} reviews</Text>
        </View>

        <Text style={styles.about}>{this.state.school.about}</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Contact', {
              name: this.state.school.name
            })
          }
          title="Contact"
          color="#4F922F"
          accessibilityLabel="Contact this school"
        />
        {reviews}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignContent: 'center'
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff'
  },

  name: {
    fontSize: 35,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 15
  },
  imageParent: {
    alignItems: 'center'
  },
  about: {
    margin: 10,
    marginTop: 20
  }
});

export default SchoolScreen;
