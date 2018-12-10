import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import { Container, Content, ListItem } from 'native-base';
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
                <View>
                  <Text style={styles.cardTitle}>{post.title}</Text>
                  <Text style={styles.cardText}>
                    <Text>By {post.author}</Text>
                    <Text>  •  </Text>
                    <Text>{formattedDate}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://www.rithmschool.com/assets/logos/300logo-e647a12a86a37452242b8a21b69d9d1dc4062424c1aba75e17ca49ba66787120.jpg"
                  }}
                />
              </View>
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
    fontSize: 20,
    paddingVertical: 5,
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'gray',
    textAlign: 'left',
    fontSize: 12,
    margin: 'auto'
  },
  cardBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '70%',
    paddingLeft: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
  },
  image: {
    margin: 20,
    width: 70,
    height: 70
  }
});
