import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

import { PROXY_URL } from '../config';
import BlogCard from '../components/BlogCard';

export default class BlogScreen extends Component {
  state = {
    loading: true,
    page: 1
  };

  static navigationOptions = {
    title: 'Blog',
    headerStyle: {
      backgroundColor: '#4F922F'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  componentDidMount() {
    this.loadResources(1)
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

  loadResources = async pageNum => {
    try {
      const url = `${PROXY_URL}/blog`;
      let response = await axios.get(url, { params: { page: pageNum } });
      let data = response.data;
      return data.posts;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      let newPosts = await this.loadResources(this.state.page);

      const updatedPosts = [...this.state.posts, ...newPosts];
      this.setState({
        posts: updatedPosts
      });
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  handleScroll = evt => {
    if (this.isCloseToBottom(evt.nativeEvent)) {
      let nextPage = this.state.page + 1;
      this.setState({
        page: nextPage
      });
    }
  };

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
        <Content onScroll={this.handleScroll}>
          <List>
            {this.state.posts.map(post => {
              const date = new Date(post.created_at);
              const formattedDate = date.toDateString();
              return (
                <BlogCard
                  key={post.id}
                  post={post}
                  navigate={() =>
                    this.props.navigation.navigate('Post', {
                      id: post.id,
                      title: post.title
                    })
                  }
                />
              );
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
      return data.posts;
    } catch (error) {
      console.log('Error:', error);
    }
  };
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
