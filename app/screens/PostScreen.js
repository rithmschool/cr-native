import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PostScreen extends Component {
  render() {
    let postId = this.props.navigation.getParam('id');
    return (
      <View>
        <Text>{postId}</Text>
      </View>
    );
  }
}

export default PostScreen;
