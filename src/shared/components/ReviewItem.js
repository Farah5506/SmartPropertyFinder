import { View, Text, StyleSheet } from 'react-native';
import RatingStars from './RatingStars';
import colors from '../theme/colors';

export default function ReviewItem({ review }) {
  return (
    <View style={styles.box}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{review.reviewerName}</Text>
        <RatingStars rating={review.stars} size={14} />
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: colors.text,
  },
  comment: {
    color: colors.text,
    lineHeight: 20,
  },
});