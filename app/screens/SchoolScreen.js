import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import ReviewCard from '../components/ReviewCard';
import { Button } from 'native-base';
import uuid from 'uuid/v4';

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
      <ReviewCard key={uuid()} review={review} />
    ));

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageParent}>
          <Image
            style={styles.image}
            source={{
              uri: this.state.school.logo
            }}
          />
          <Text style={styles.name}>{this.state.school.name}</Text>

          {this.state.school.avg_review_rating ? (
            <Text>{this.state.school.avg_review_rating} stars</Text>
          ) : (
            <Text />
          )}
          <Text>{this.state.school.review_count} reviews</Text>
        </View>

        <Text style={styles.about}>{this.state.school.about}</Text>
        <Button
          full
          onPress={() =>
            this.props.navigation.navigate('Contact', {
              school: this.state.school
            })
          }
          title="Contact"
          color="#4F922F"
          accessibilityLabel="Contact this school"
        />
        <Text style={styles.reviewTitle}>Reviews</Text>
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
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 35,
    paddingVertical: 15
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
    alignItems: 'center'
  },
  about: {
    textAlign: 'left',
    color: 'gray',
    fontSize: 14,
    paddingVertical: 35
  }
});

export default SchoolScreen;
