import React, { Component } from 'react';
import { Image, View, Text, Button } from 'react-native';

import axios from 'axios';
const BASE_URL = 'http://192.168.1.227:3001';

class SchoolScreen extends Component {
  state = {
    school: {},
    loading: true
  };

  async componentDidMount() {
    let schoolId = this.props.navigation.getParam('id');
    //do the axios call to get the data for an individual school
    let resp = await axios.get(`${BASE_URL}/schools/${schoolId}`);
    this.setState({ school: resp.data.school });
  }

  render() {
    console.log('this.props', this.props);
    return (
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: this.state.school.logo_url
          }}
        />
        <Text>{this.state.school.name}</Text>
        <Text>{this.state.school.about}</Text>
        <Text>Rating: {this.state.school.avg_review_rating}</Text>
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
      </View>
    );
  }
}

export default SchoolScreen;
