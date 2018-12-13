import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
import debounce from 'lodash/debounce';
import SchoolCard from '../components/SchoolCard';

import { PROXY_URL } from '../config';

export default class SchoolsScreen extends React.Component {
  static navigationOptions = {
    title: 'Schools',
    headerStyle: {
      backgroundColor: '#4F922F'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  state = {
    schools: [],
    loading: true,
    page: 1,
    search: ''
  };

  loadResources = async page => {
    try {
      const url = `${PROXY_URL}/schools`;
      let response = await axios.get(url, { params: { page } });
      let data = response.data;
      return data.schools;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  async componentDidMount() {
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

  async requestNewSchools(search) {
    const url = `${PROXY_URL}/schools?search=${search}`;
    let response = await axios.get(url);
    this.setState({
      schools: response.data.schools
    });
  }

  handleChange(search) {
    // Update the search input with what they typed
    this.setState({ search });

    //debounce a request for what to update for this.state
    let requestNewSchools = () => {
      this.requestNewSchools(search);
    };
    debounce(requestNewSchools, 500)();
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
      if (school.name.toLowerCase().includes(this.state.search.toLowerCase())) {
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

        <Content onScroll={this.handleScroll}>
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
