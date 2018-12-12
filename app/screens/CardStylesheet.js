import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  cardTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'gray',
    textAlign: 'left',
    fontSize: 12,
    margin: 'auto'
  },
  cardBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '70%',
    paddingLeft: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto'
  },
  image: {
    margin: 20,
    width: 70,
    height: 70
  }
}));
