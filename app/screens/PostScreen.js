import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Container, Header, Content, H1, H2, H3 } from 'native-base';
import axios from 'axios';
import { PROXY_URL } from '../config';
import Post from '../components/Post';
import withOrientation from 'react-navigation/src/views/withOrientation';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class PostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      post: null,
      loading: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerStyle: {
      backgroundColor: '#4F922F'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  });

  async componentDidMount() {
    let postId = this.props.navigation.getParam('id');
    let postData = await axios.get(`${PROXY_URL}/blog/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    this.setState({ post: postData.data.post, loading: false });
  }

  _renderScrollViewContent = () => {
    if (this.state.post) {
      post = { ...this.state.post };
      return (
        <View style={styles.scrollViewContent}>
          <Post post={post} />
        </View>
      );
    }
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    });
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#4F922F"
          style={styles.activityIndicator}
        />
      );
    } else {
      return (
        <View style={styles.fill}>
          <ScrollView
            style={styles.fill}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])}
          >
            {this._renderScrollViewContent()}
          </ScrollView>
          <Animated.View style={[styles.header, { height: headerHeight }]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }]
                }
              ]}
              // source={{ uri: this.state.post.header_url }}
              source={require('../assets/images/cat.jpg')}
            />
          </Animated.View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
    backgroundColor: 'white'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  }
});

export default PostScreen;
