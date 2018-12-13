import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
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
    page: 1
  };

  loadResources = async(page) => {
    try {
      const url = `${PROXY_URL}/schools`;
      let response = await axios.get(url, {params: {page}});
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
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
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
  }
});
