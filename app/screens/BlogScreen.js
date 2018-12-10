import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Container, Content, Header, List, ListItem } from 'native-base';
import { PROXY_URL } from '../config';
import axios from 'axios';

const loadResources = async () => {
  try{
    const url = PROXY_URL + '/blog';
    let response = await axios({
      url: url,
      method: 'get'
    });
    let data = await response.data;
    return data.posts
  } catch (error) {
    console.log('Error:', error)
  }
}

export default class BlogScreen extends Component {
  state = {
    loading: true
  }

  static navigationOptions = {
    title: 'Blog'
  };

  componentDidMount() {
    loadResources()
    .then(res => {
      this.setState({
        loading: false,
        posts: res
      })
    }).catch(err => {
      console.log('err', err)
    })
  }

  _handleButton = id => {
    this.props.navigation.navigate('Post', { id });
  }

  render() {
    if (this.state.loading) return <Text>Loading...</Text>
    return (
      <Container style={styles.container}>
        <Content>
          <View>
          {this.state.posts.map(post => {
            const date = new Date(post.created_at);
            const formattedDate = date.toDateString();
            return (
            <ListItem key={post.id}>
              <TouchableOpacity 
                onPress={() => this._handleButton(post.id)} 
                style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{post.title}</Text>
                  <Text style={styles.cardText}>
                    <Text>By {post.author}</Text>
                    <Text>  •  </Text>
                    <Text>{formattedDate}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </ListItem>
            )
          })}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  cardTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 5,
  },
  cardText: {
    textAlign: 'left',
    fontSize: 12
  },
  card: {
    padding: 10,
    width: "100%",
    height: 'auto',
  },
  cardContainer: {
    width: "100%",
    height: 'auto',
  },
});
