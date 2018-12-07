import React, { Component } from 'react';
import { Alert, Text, TouchableHighlight, ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

_loadResources = async () => {
  try{
    // const url = 'http://192.168.1.227:3001/blog';
    const url = 'http://192.168.1.8:3001/blog';
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.posts
  } catch (error) {
    console.log('Error:', error)
  }
}

export default class BlogScreen extends Component {
  state = {
    loading: true
  }

  static navigationOptions = {
    title: 'Blog Posts'
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
        {this.state.posts.map(post => {
          const date = new Date(post.created_at);
          const formattedDate = date.toDateString();
          return (
          <View  key={post.id}>
            <TouchableHighlight onPress={this._handleButton} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text>By
                  <Text > {post.author} </Text> 
                  <Text> • </Text>
                  <Text> {formattedDate}</Text>
                </Text>
              </View>
            </TouchableHighlight>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
          </View>
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontSize: 18,
    paddingVertical: 5
  },
  card: {
    padding: 10,
    textAlign: 'center',
    width: "100%",
    height: 'auto',
    backgroundColor: 'lightgrey'
  },
  cardContainer: {
    width: "100%",
    height: 'auto',
  },
});
