import React from 'react';
import { Image} from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class BannerCard extends React.Component {

  render() {
    //Store banner items here
    let bannerUri = 'https://www.coursereport.com/best-coding-bootcamps'

    return (
        <Card>
                <CardItem cardBody button onPress={() => alert("This needs to be built")} href={'https://www.coursereport.com/best-coding-bootcamps'}>
                <Text>
                    Our Picks: The Best 51 Coding Bootcamps of 2018-2019.
                </Text>
                </CardItem>
        </Card>
    );
  }
}

export default BannerCard;
