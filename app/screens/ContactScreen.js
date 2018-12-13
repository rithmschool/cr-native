import React from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { PROXY_URL } from '../config';
import {
  Container,
  Header,
  Content,
  Picker,
  Form,
  Button,
  Text,
  Input,
  Item,
  Label,
  Textarea,
  Icon
} from 'native-base';
import { StackActions } from 'react-navigation';

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    let school = props.navigation.getParam('school');
    console.log(school.campuses);
    this.state = {
      message: '',
      phone: '',
      name: '',
      email: '',
      campus_id: '',
      course_id: '',
      school_id: school.id,
      contact: school.contact.name,
      contact_email: school.contact.email,
      courseArr: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Start The Conversation'
  };

  handleName = text => {
    this.setState({ name: text });
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePhone = text => {
    this.setState({ phone: text });
  };

  handleMessage = text => {
    this.setState({ message: text });
    console.log(this.state);
  };

  handleCampus = text => {
    this.setState({ campus_id: text });
    this.setState({
      courseArr: this.props.navigation.getParam('school').campuses[text].courses
    });
  };

  handleCourse = text => {
    this.setState({ course_id: text });
  };

  async handleSubmit() {
    const {
      courseArr: [],
      ...data
    } = this.state;
    let resp = await axios({
      method: 'post',
      url: `${PROXY_URL}/contact`,
      data
    });
    const popAction = StackActions.pop({ n: 1 });
    this.props.navigation.dispatch(popAction);
  }

  render() {
    //Campus pickers
    const campusEntries = Object.entries(
      this.props.navigation.getParam('school').campuses
    );
    const campusItems = campusEntries.map(campus => (
      <Picker.Item key={campus[0]} label={campus[1].name} value={campus[0]} />
    ));

    let campusPicker = (
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        placeholder="Select your campus"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        style={{ width: undefined }}
        selectedValue={this.state.campus_id}
        onValueChange={this.handleCampus}
      >
        {campusItems}
      </Picker>
    );

    //Course pickers

    const courseArr = this.state.courseArr;
    const courseItems = courseArr.map(course => (
      <Picker.Item key={course.id} label={course.name} value={course.id} />
    ));

    let coursePicker = (
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        placeholder="Select your Course"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        style={{ width: undefined }}
        selectedValue={this.state.course_id}
        onValueChange={this.handleCourse}
      >
        {courseItems}
      </Picker>
    );

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={this.handleName} value={this.state.name} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={this.handleEmail} value={this.state.email} />
            </Item>
            <Item floatingLabel>
              <Label>Phone</Label>
              <Input onChangeText={this.handlePhone} value={this.state.phone} />
            </Item>
            <Item floatingLabel last>
              <Label>Message</Label>
              <Input
                onChangeText={this.handleMessage}
                value={this.state.message}
              />
            </Item>
            <Item>{campusPicker}</Item>
            <Item>{coursePicker}</Item>
            <Button full success onPress={this.handleSubmit}>
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
