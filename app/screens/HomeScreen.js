import React from 'react';
import { StyleSheet, ActivityIndicator,Image } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';
import BannerCard from '../components/BannerCard';
import FeaturedSchools from '../components/FeaturedSchools';
import { PROXY_URL } from '../config';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    featuredSchools: [],
    loading: true
  };

  async componentDidMount() {
    let featuredSchoolsData = await axios.get(`${PROXY_URL}/schools/featured`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    this.setState({ featuredSchools: featuredSchoolsData.data.schools, loading: false });
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
        <Content>
          {/*banner card features can be added later*/}
          {/* <BannerCard></BannerCard> */}
          <FeaturedSchools featuredSchools={this.state.featuredSchools} navigation={this.props.navigation}></FeaturedSchools>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
