import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Container, Content, List } from 'native-base';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import SchoolCard from '../components/SchoolCard';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { PROXY_URL } from '../config';

const deltas = {
  latDelta: 0.0922,
  longDelta: 0.0421
};

export default class SchoolsScreen extends React.Component {
  static navigationOptions = {
    title: 'Schools',
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

  state = {
    region: null,
    schools: [],
    loading: true,
    page: 1,
    search: '',
    searchLoading: false
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      lat: location.coords.latitude,
      long: location.coords.longitude
    };

    await this.setState({ region });
  };

  loadResources = async page => {
    try {
      const url = `${PROXY_URL}/schools`;
      let response;
      if (this.state.region) {
        let loc = `${this.state.region.lat},${this.state.region.long}`;
        response = await axios.get(url, { params: { page, loc } });
      } else {
        response = await axios.get(url, { params: { page } });
      }
      let data = response.data;
      return data.schools;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  async componentDidMount() {
    await this.getLocationAsync();
    let schools = await this.loadResources(this.state.page);
    this.setState({ schools, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      let newSchools = await this.loadResources(this.state.page);

      const updatedSchools = [...this.state.schools, ...newSchools];
      this.setState({
        schools: updatedSchools
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

  searchAPI = search => axios.get(`${PROXY_URL}/schools?search=${search}`);

  //sends a request after 250 milliseconds, but will only resolve the last promise
  searchAPIDebounced = AwesomeDebouncePromise(this.searchAPI, 250);

  async handleChange(search) {
    // Update the search input with what they typed
    this.setState({ search, searchLoading: true });
    const schools = await this.searchAPIDebounced(search);
    //Update state with the new schools
    this.setState({ schools: schools.data.schools, searchLoading: false });
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
    let schoolCards = this.state.schools.map(school => {
      if (
        this.state.search === '' ||
        school.name.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return (
          <SchoolCard
            school={school}
            navigate={() =>
              this.props.navigation.navigate('School', { id: school.id })
            }
            key={school.id}
          />
        );
      }
    });

    return (
      <Container>
        <TextInput
          lable="Search"
          placeholder="Search by school name"
          value={this.state.search}
          onChangeText={search => this.handleChange(search)}
          style={styles.search}
        />
        {this.state.searchLoading}
        <Content onScroll={this.handleScroll}>
          {this.state.searchLoading ? (
            <ActivityIndicator
              size="large"
              color="#4F922F"
              style={styles.activityIndicator}
            />
          ) : null}
          <List>{schoolCards}</List>
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
  },
  search: {
    flex: 0,
    flexDirection: 'column',
    padding: 25,
    fontWeight: 'bold',
    fontSize: 20
  }
});
