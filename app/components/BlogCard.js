import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { ListItem } from 'native-base';
import styles from '../screens/CardStylesheet';

class BlogCard extends React.Component {
  _handleButton = () => {
    this.props.navigate();
  };

  render() {
    const date = new Date(this.props.post.created_at);
    const formattedDate = date.toDateString();
    const header_url = this.props.post.header_url;
    return (
      <ListItem>
        <TouchableOpacity
          onPress={this._handleButton}
          style={styles.cardContainer}
        >
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{this.props.post.title}</Text>
            <Text style={styles.cardText}>
              <Text>By {this.props.post.author}</Text>
              <Text> • </Text>
              <Text>{formattedDate}</Text>
            </Text>
          </View>
          <View>
            {header_url ? (
              <Image
                style={styles.image}
                source={{
                  uri: header_url
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

export default BlogCard;
