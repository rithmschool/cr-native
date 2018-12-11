import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Button } from 'native-base';
import ReviewCard from '../components/ReviewCard';
import Stars from '../components/Stars';

import axios from 'axios';
import { PROXY_URL } from '../config';

class SchoolScreen extends Component {
  state = {
    school: {},
    loading: true
  };

  async componentDidMount() {
    try {
      let schoolId = this.props.navigation.getParam('id');
      //do the axios call to get the data for an individual school
      let resp = await axios.get(`${PROXY_URL}/schools/${schoolId}`);
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
      <ReviewCard key={review.id} review={review} />
    ));

    console.log('this.state.school', this.state.school);

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
          <Stars rating={this.state.school.avg_review_rating} size={20} />

          <Text>{this.state.school.review_count} reviews</Text>
        </View>

        <Text style={styles.about}>{this.state.school.about}</Text>
        {this.state.school.contact ? (
          <Button
            full
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('Contact', {
                school: this.state.school
              })
            }
          >
            <Text style={styles.buttonText}>Contact</Text>
          </Button>
        ) : (
          <Text />
        )}

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
  button: {
    backgroundColor: '#4F922F',
    marginBottom: 30
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
  }
});

export default SchoolScreen;
