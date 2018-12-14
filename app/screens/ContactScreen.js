import React from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { PROXY_URL } from '../config';
import {
  Container,
  Content,
  Picker,
  Form,
  Button,
  Text,
  Input,
  Item,
  Label,
  Icon
} from 'native-base';
import { StackActions } from 'react-navigation';

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    let school = props.navigation.getParam('school');
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

  /** Set the navigation header bar */
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#4F922F'
    },
    title: 'Contact',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'share-tech',
      fontSize: 25
    }
  });

  /** Text field change handlers */
  handleName = text => {
    this.setState({ name: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePhone = text => {
    this.setState({ phone: text });
  };
  handleMessage = (text) => {
    this.setState({message:text});
  }
  handleCampus = text => {
    this.setState({
      campus_id: text,
      courseArr: this.props.navigation.getParam('school').campuses[text].courses
    });
  };
  handleCourse = text => {
    this.setState({ course_id: text });
  };


  // return true if passed a valid email string
  isValidEmail = email => email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null;


  /** Handle form submission and POST to proxy server 
   * 
   * This function needs to check for validation before making
   * a request to server. 
  */
  async handleSubmit() {

    const {
      courseArr: [],
      ...data
    } = this.state;
    console.log(data);


    /** This should be moved outside of handleSubmit and 
     * should set errors in state in order to display errors on the 
     * form
     */
    const errors = [];
    if (data.name === '') errors.push('Name cannot be blank');
    if (!isValidEmail(data.email)) errors.push('Must enter a valid email');
    if (data.phone === '') errors.push('Must enter a valid phone number');


    /** 
     * axios call and navigation pop is commented out until
     * form validation is finished
     */

    // let resp = await axios({
    //   method: 'post',
    //   url: `${PROXY_URL}/contact`,
    //   data
    // });
    // const popAction = StackActions.pop({ n: 1 });
    // this.props.navigation.dispatch(popAction);
  }

  render() {
    // Build pickers for campus
    const campusPicker = this.buildCampusPicker();
    // Build course pickers
    const coursePicker = this.buildCoursePicker();

    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={this.handleName} value={this.state.name} />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={this.handleEmail} value={this.state.email} />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input onChangeText={this.handlePhone} value={this.state.phone} />
            </Item>
            <Item stackedLabel>
              <Label>Message</Label>
              <Input
                onChangeText={this.handleMessage}
                value={this.state.message}
              />
            </Item>
            <Label style={styles.dropdownLabel}>Campus</Label>
            <Item>    
              {campusPicker}
            </Item>
            <Label style={styles.dropdownLabel}>Course</Label>
            <Item>
              {coursePicker}
            </Item>
            <Button full success onPress={this.handleSubmit} style={styles.button}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  /** Sort campuses by city for dropdown list */
  sortByCity(campuses) {
    return campuses.sort((a, b) => {
      var nameA = a[1].name.toUpperCase(); // ignore upper and lowercase
      var nameB = b[1].name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  /** build and return a Picker dropdown for Campuses in alphabetical order */
  buildCampusPicker() {
    const campusEntries = Object.entries(
      this.props.navigation.getParam('school').campuses
    );
    const campusList = this.sortByCity(campusEntries)
    const campusItems = campusList.map(campus => (
      <Picker.Item key={campus[0]} label={campus[1].name} value={campus[0]} />
    ));

    return (
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        placeholder="Select your campus"
        placeholderStyle={{ color: '#bfc6ea' }}
        prompt=""
        placeholderIconColor="#007aff"
        style={{ width: undefined }}
        selectedValue={this.state.campus_id}
        onValueChange={this.handleCampus}
      >
        {campusItems}
      </Picker>
    );
  }

  /** build and return a Picker dropdown for Courses 
   * this could be put into alphabetical order
   */
  buildCoursePicker() {
    const courseArr = this.state.courseArr;
    const courseItems = courseArr.map(course => (
      <Picker.Item key={course.id} label={course.name} value={course.id} />
    ));

    return (
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  inputField: {

  },
  dropdownLabel: {
    fontSize: 15,
    color: 'grey',
    paddingLeft: 15,
    paddingTop: 25
  },
  button: {
    marginVertical: 10
  },
  picker: { width: 100 }
});
