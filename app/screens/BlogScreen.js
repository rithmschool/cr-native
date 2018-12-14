import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
import { debounce } from 'underscore';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

import { PROXY_URL } from '../config';
import BlogCard from '../components/BlogCard';

export default class BlogScreen extends Component {
  state = {
    loading: true,
    page: 1,
    posts: [],
    search: ''
  };

  static navigationOptions = {
    title: 'Blog',
    headerStyle: {
      backgroundColor: '#4F922F'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'share-tech',
      fontSize: 25
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

  //returns true if you are 20 pixels from the bottom of the page to allow for
  //infinite scroll.
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  //updates state to load next page if you are close to bottom or state search is empty
  handleScroll = evt => {
    if (this.state.search === '' && this.isCloseToBottom(evt.nativeEvent)) {
      let nextPage = this.state.page + 1;
      this.setState({
        page: nextPage
      });
    }
  };

  _handleButton = id => {
    this.props.navigation.navigate('Post', { id });
  };

  async requestNewPosts(search) {
    if (search.length > 0) {
      const url = `${PROXY_URL}/blog?search=${search}`;
      let response = await axios.get(url);
      this.setState({
        posts: response.data.posts
      });
    }
  }

  handleChange(search) {
    // Update the search input with what they typed
    this.setState({ search });

    //debounce a request for what to update for this.state
    let requestNewPosts = () => {
      this.requestNewPosts(search);
    };
    debounce(requestNewPosts, 500)();
  }

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
        <TextInput
          lable="Search"
          placeholder="Search by title or topic"
          value={this.state.search}
          onChangeText={search => this.handleChange(search)}
          style={styles.search}
        />

        <Content onScroll={this.handleScroll}>
          <List>
            {this.state.posts.map(post => {
              if (
                this.state.search === '' ||
                post.title
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
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
              }
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
  },
  search: {
    flex: 0,
    flexDirection: 'column',
    padding: 25,
    fontWeight: 'bold',
    fontSize: 20
  }
});
