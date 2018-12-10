import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ReviewCard extends React.Component {
  render() {
    console.log(this.props);
    let date = new Date(this.props.review.created_at);
    return (
      <View>
        <Text style={styles.reviewerName}>
          {this.props.review.reviewer_name}
        </Text>
        <Text style={styles.reviewRow}>{date.toLocaleDateString()}</Text>
        <Text style={styles.reviewRow}>
          Overall Experience: {this.props.review.overall_experience_rating}
        </Text>
        <Text style={styles.reviewRow}>
          Curriculum: {this.props.review.course_curriculum_rating}
        </Text>
        <Text style={styles.reviewRow}>
          Instructors: {this.props.review.course_instructors_rating}
        </Text>
        <Text style={styles.reviewRow}>
          Job Assistance: {this.props.review.school_job_assistance_rating}
        </Text>
        <Text style={styles.reviewBody}>{this.props.review.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewerName: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5
  },
  reviewBody: {
    textAlign: 'left',
    color: 'gray',
    fontSize: 14,
    paddingVertical: 5
  },
  reviewRow: {
    textAlign: 'left',
    color: 'gray',
    fontSize: 14,
    paddingVertical: 5
  }
});

export default ReviewCard;
