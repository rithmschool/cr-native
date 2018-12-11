import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
import { PROXY_URL } from '../config';
import BlogCard from '../components/BlogCard';

const loadResources = async () => {
  try {
    const url = PROXY_URL + '/blog';
    let response = await axios({
      url: url,
      method: 'get'
    });
    let data = await response.data;
    return data.posts;
  } catch (error) {
    console.log('Error:', error);
  }
};

export default class BlogScreen extends Component {
  state = {
    loading: true
  };

  static navigationOptions = {
    title: 'Blog'
  };

  componentDidMount() {
    loadResources()
      .then(res => {
        this.setState({
          loading: false,
          posts: res
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  _handleButton = id => {
    this.props.navigation.navigate('Post', { id });
  };

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
    return (
      <Container>
        <Content>
          <List>
            {this.state.posts.map(post => {
              const date = new Date(post.created_at);
              const formattedDate = date.toDateString();
              return <BlogCard
                key={post.id}
                post={post}
                navigate={() => this.props.navigation.navigate('Post', { id: post.id })}
              />
            })}
          </List>
        </Content>
      </Container>
    );
  }

  _loadResources = async () => {
    try {
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
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
