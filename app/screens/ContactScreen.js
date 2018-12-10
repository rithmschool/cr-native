import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Picker, Form, Button, Text, Input, Item, Label } from "native-base";
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      phone: '',
      name: '',
      email: '',
      campus_id: '',
      course_id: '',
      school_id: '',
      contact: '',
      modalVisible: false,
      contact_email: '',
      contact: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    school: {
      id: 153,
      name: 'Le Wagon',
      campuses: {
        455: {
          name: 'San Francisco',
          courses: [
            {
              id: 3342,
              name: 'Ruby for Dummies',
            },
            {
              id: 3343,
              name: 'Ruby for Iiiidiots',
            }
          ]
        },
        456: {
          name: 'Berkeley',
          courses: [
            {
              id: 3344,
              name: 'Java for CS Losers',
            },
            {
              id: 3345,
              name: 'Java for limo drivers',
            }
          ]
        }
      },
      contact: {
        name: 'Cédric',
        email: 'cedric@lewagon.com',
      }

    }
  };

  static navigationOptions = {
    title: 'Start The Conversation'
  };

  handleChange(evt) {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState({[key]: value});
    console.warning(this.state);
  }

  handleSubmit() {
    console.warning(this.state);
  }

  render() {
    const campusEntries = Object.entries(this.props.school.campuses);
    const campusItems = campusEntries.map(campus => (
      <Picker.Item key={campus[0]} label={campus[1].name} value={campus[0]} />
    ));

    let coursePicker;
    if(Platform.OS === 'android') {
      coursePicker = (<Picker
        selectedValue={this.state.campus_id}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({ campus_id: itemValue })
          console.log(this.state);
        }}
      >
        {campusItems}
      </Picker>)
    } else {

    }

    return (
      <Container>
        <Header />
        <Form>
          <Content>
            <Item regular>
              <Label></Label>
              <Input placeholder='here'>
            </Item>
         </Content>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  picker: { width: 100 }
});
