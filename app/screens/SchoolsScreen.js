import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
import SchoolCard from '../components/SchoolCard';

import { PROXY_URL } from '../config';

export default class SchoolsScreen extends React.Component {
  static navigationOptions = {
    title: 'Schools'
  };

  state = {
    schools: [],
    loading: true,
<<<<<<< HEAD
    search: ''
  };

  async componentDidMount() {
    let schoolsData = await axios.get(`${PROXY_URL}/schools?page=2`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    this.setState({ schools: schoolsData.data.schools, loading: false });
=======
    page: 1
  };

  loadResources = async (page) => {
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
        schools: updatedSchools,
      });
    }
>>>>>>> a2e683f28a5c3ec4a924f47553e95b02d6d51f68
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
        page: nextPage,
      });
    }
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
    let schoolCards = this.state.schools.map(school => {
      if (school.name.includes(this.state.search)) {
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
<<<<<<< HEAD
        <TextInput
          lable="Search"
          placeholder="Search by school name"
          value={this.state.search}
          onChangeText={search => this.setState({ search })}
          style={styles.search}
        />

        <Content>
=======
        <Content onScroll={this.handleScroll}>
>>>>>>> a2e683f28a5c3ec4a924f47553e95b02d6d51f68
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
