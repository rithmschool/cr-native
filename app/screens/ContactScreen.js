import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Picker,
  Text,
  Modal,
  View,
  Platform
} from 'react-native';
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
      modalVisible: false
      // contact_email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static defaultProps = {
    campus_id: 455,
    school_id: 153,
    campuses: { Rio: 1, 'Sao Paulo': 2, 'San Francisco': 3, Fremont: 4 },
    courses: { 'Full Stack Web Development': 510, 'Meme Development': 415 },
    course_ids: []
  };

  static navigationOptions = {
    title: 'Start The Conversation'
  };

  handleSubmit() {
    console.log(this.state);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const campusEntries = Object.entries(this.props.campuses);

    const campusItems = campusEntries.map(entry => (
      <Picker.Item label={entry[0]} value={entry[1]} />
    ));

    let coursePicker;
    if(Platform.OS === 'android') {
      coursePicker = (<Picker
        selectedValue={this.state.language}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ course_id: itemValue })
        }
      >
        {campusItems}
      </Picker>)
    } else {
      coursePicker = (<Text>
        Here!!
        </Text>)
    }

    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
          lable="Name"
          placeholder="Name"
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
        />
        <Text>Email</Text>
        <TextInput
          lable="Email"
          placeholder="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Text>Phone Number</Text>
        <TextInput
          lable="Phone Number"
          placeholder="Phone Number"
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <Text>Message</Text>
        <TextInput
          lable="Message"
          placeholder="Message"
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
        />
        <Text>Campus</Text>
       {coursePicker}

        {/* <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
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
