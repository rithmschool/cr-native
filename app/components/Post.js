import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { getReminderAsync } from 'expo/build/Calendar';

class Post extends React.Component {
  render() {
    const date = new Date(this.props.post.created_at);
    const formattedDate = date.toDateString();
    return (
      <View style={styles.postContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.postTitle}>{this.props.post.title}</Text>
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>{this.props.post.author}</Text>
          <Text style={styles.dateText}> • {formattedDate}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{this.props.post.body}</Text>
        </View>
        {/* <Text>{this.props.title}</Text> */}
        {/* <Text>{this.props.post.body}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30
  },
  authorContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15
  },
  authorText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'green'
  },
  dateText: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'left'
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'open-sans-regular'
  },
  postTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'share-tech'
  }
});

export default Post;
