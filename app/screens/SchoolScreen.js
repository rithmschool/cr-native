import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SchoolScreen extends Component {
  render() {
    let schoolId = this.props.navigation.getParam('id');
    return (
      <View>
        <Text>{schoolId}</Text>
      </View>
    );
  }
}

export default SchoolScreen;
