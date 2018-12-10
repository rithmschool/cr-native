import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Picker, Form, Button, Text, Input, Item, Label, Textarea,Icon } from "native-base";

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    let school = props.navigation.getParam('school')
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
      courseArr:'',
      selected:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleCampus = (text) => {
    this.setState({campus_id:text});
    this.setState({courseArr:text});
    console.log(this.state)
  }

  handleSubmit() {
    console.warning(this.state);
  }

  render() {
    const campusItems = [<Picker.Item label="Wallet" value="key0" />,
    <Picker.Item label="ATM Card" value="key1" />,
    <Picker.Item label="Debit Card" value="key2" />,
    <Picker.Item label="Credit Card" value="key3" />,
    <Picker.Item label="Net Banking" value="key4" />]

    // const campusEntries = Object.entries(this.props.navigation.getParam('school').campuses);
    // console.log(this.props.navigation.getParam('school').campuses)
    // const campusItems = campusEntries.map(campus => (
    //   <Picker.Item key={campus[0]} label={campus[1].name} value={campus[0]} />
    // ));

    let coursePicker = 
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    placeholder="Select your campus"
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    style={{ width: undefined }}
    selectedValue={this.state.selected}
    onValueChange={this.handleCampus}>
    {campusItems}
  </Picker>
    
    // (<Picker
    //     selectedValue={this.state.campus_id}
    //     style={styles.picker}
    //     onValueChange={(itemValue, itemIndex) => {
    //       this.setState({ campus_id: itemValue })
    //       console.log(this.state);
    //     }}
    //   >
    //     {campusItems}
    //   </Picker>)

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
          <Item>
            {coursePicker}
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
