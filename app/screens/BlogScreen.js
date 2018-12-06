import React from 'react';
import { Alert, Text, TouchableHighlight, ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

_loadResources = async () => {
  try{
    const url = 'http://192.168.1.8:3001/blog';
    console.log('\n~~~~~~~~~~~\nMaking get request to', url);
    let response = await fetch(url);
    let responseJson = await response.json();
    console.log('\n~~~~~~~~~~~\nWhich responded with', JSON.stringify(responseJson.blogList.posts[0].title))
    return responseJson.blogList.posts
  } catch (error) {
    console.log('Error:', error)
  }
}


export default class BlogScreen extends React.Component {
  state = {
    loading: true
  }
  static navigationOptions = {
    title: 'Links'
  };

  componentDidMount() {
    _loadResources()
    .then(res => {
      this.setState({
        loading: false,
        posts: res
      })
    }).catch(err => {
      console.log('err', err)
    })
  }

  _handleButton = () => {
    Alert.alert('Button Alert', 'You pressed a button',
    [
      {text: 'Cool!'},
      {text: 'Lame'},
      {text: 'Cancel', style: 'cancel'}
    ])
  }

  render() {
    console.log('render ran with state', JSON.stringify(this.state).slice(0,600))
    if (this.state.loading) return <Text>Loading...</Text>
    return (
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(Object.keys(this.state.posts[0]))}</Text>
        {this.state.posts.map(post => {
          return (
          <TouchableHighlight key={post.id} onPress={this._handleButton} style={styles.cardContainer}>
          <View style={styles.card}>
            <Text>Title: {post.title}</Text>
            <Text>Created At:{post.created_at}</Text>
          </View>
          </TouchableHighlight>)
        })}
      </ScrollView>
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
    width: "100%",
    height: 'auto',
    backgroundColor: 'lightgrey'
  },
  cardContainer: {
    marginVertical: 10,
    width: "100%",
    height: 'auto',
  },
});
