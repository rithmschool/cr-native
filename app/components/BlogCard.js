import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { ListItem } from 'native-base';
import styles from '../screens/CardStylesheet';

class BlogCard extends React.Component {
  _handleButton = () => {
    this.props.navigate()
  }

  render() {
    const date = new Date(this.props.post.created_at);
    const formattedDate = date.toDateString();
    return (
      <ListItem>
        <TouchableOpacity
          onPress={this._handleButton}
          style={styles.cardContainer}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{this.props.post.title}</Text>
            <Text style={styles.cardText}>
              <Text>By {this.props.post.author}</Text>
              <Text>  •  </Text>
              <Text>{formattedDate}</Text>
            </Text>
          </View>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: "https://www.rithmschool.com/assets/logos/300logo-e647a12a86a37452242b8a21b69d9d1dc4062424c1aba75e17ca49ba66787120.jpg"
              }}
            />
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

export default BlogCard;
