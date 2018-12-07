import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SchoolScreen extends Component {
  render() {
    let school = this.props.navigation.getParam('school');
    return (
      <View>
        <Text>{school.id}</Text>
      </View>
    );
  }
}

export default SchoolScreen;
