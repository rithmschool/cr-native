import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, List } from 'native-base';
import axios from 'axios';
import SchoolCard from '../components/SchoolCard';

const BASE_URL = 'http://192.168.1.227:3001';

export default class SchoolsScreen extends React.Component {
  static navigationOptions = {
    title: 'Schools'
  };

  state = {
    schools: [],
    loading: true
  };

  async componentDidMount() {
    let schoolsData = await axios.get(`${BASE_URL}/schools`, {
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
    let schoolCards = this.state.schools.slice(30, 50).map(school => {
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
