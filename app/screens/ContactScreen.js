import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Picker, Form, Button, Text, Input, Item, Label, Textarea } from "native-base";

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
      school_id: this.props.school.id,
      contact: this.props.school.contact.name,
      contact_email: this.props.school.contact.email,
      courseArr:'',

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleName = this.handleName.bind(this);
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

  handleName = (text) => {
    this.setState({name:text});
  }

  handleEmail = (text) => {
    this.setState({email:text});
  }

  handlePhone = (text) => {
    this.setState({phone:text});
  }

  handleMessage = (text) => {
    this.setState({message:text});
    console.log(this.state)
  }

  handleSubmit() {
    console.warning(this.state);
  }

  render() {
    const campusEntries = Object.entries(this.props.school.campuses);
    const campusItems = campusEntries.map(campus => (
      <Picker.Item key={campus[0]} label={campus[1].name} value={campus[0]} />
    ));

    let coursePicker = (<Picker
        selectedValue={this.state.campus_id}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({ campus_id: itemValue })
          console.log(this.state);
        }}
      >
        {campusItems}
      </Picker>)

    return (
      <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={this.handleName} value={this.state.name}/>
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={this.handleEmail} value={this.state.email}/>
          </Item>
          <Item floatingLabel>
            <Label>Phone</Label>
            <Input onChangeText={this.handlePhone} value={this.state.phone}/>
          </Item>
          <Item floatingLabel last>
            <Label>Message</Label>
            <Input onChangeText={this.handleMessage} value={this.state.message}/>
          </Item>
          <Button full success>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
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
