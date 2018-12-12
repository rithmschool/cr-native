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
      return (
        <SchoolCard
          school={school}
          navigate={() =>
            this.props.navigation.navigate('School', { id: school.id })
          }
          key={school.id}
        />
      );
    });

    return (
      <Container>
        <TextInput
          lable="Search"
          placeholder="Search"
          value={this.state.search}
          onChangeText={search => this.setState({ search })}
        />

        <Content>
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
  }
});
