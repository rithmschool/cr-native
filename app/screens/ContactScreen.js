import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button } from 'react-native';
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
      // contact_email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Start The Conversation'
  };

  handleSubmit() { 
    console.log(this.state);
  }


  render() {
    return (
      <React.Fragment>
        <TextInput lable="Name" placeholder="Name" value={this.state.name} onChangeText={name => this.setState({name})}></TextInput>
        <TextInput lable="Email" placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})}></TextInput>
        <TextInput lable="Phone Number" placeholder="Phone Number" value={this.state.phone} onChangeText={phone => this.setState({phone})}></TextInput>
        <TextInput lable="Message" placeholder="Message" value={this.state.message} onChangeText={message => this.setState({message})}></TextInput>
        <Button title="Submit" onPress={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
