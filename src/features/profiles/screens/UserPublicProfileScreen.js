import { useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import Avatar from '../../../shared/components/Avatar';
import RatingStars from '../../../shared/components/RatingStars';
import ReviewItem from '../../../shared/components/ReviewItem';
import RateForm from '../components/RateForm';
import { users, reviews, currentAdvertiser } from '../../../shared/data/mockData';
import { getAverageRating } from '../../../shared/utils/formatters';
import colors from '../../../shared/theme/colors';

export default function UserPublicProfileScreen({ route }) {
  const userId = route.params?.userId || 'u1';
  const user = users.find((u) => u.id === userId);

  const [userReviews, setUserReviews] = useState(reviews.filter((r) => r.targetId === userId));

  if (!user) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.muted}>User not found</Text>
      </View>
    );
  }

  const average = getAverageRating(userReviews);

  function addReview(stars, comment) {
    const newReview = {
      id: Date.now().toString(),
      targetId: user.id,
      reviewerName: currentAdvertiser.name,
      stars: stars,
      comment: comment,
    };
    setUserReviews([newReview, ...userReviews]);
    Alert.alert('Thank you', 'Your rating was added');
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Avatar name={user.name} size={84} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.muted}>Member since {user.memberSince}</Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={average} size={20} />
          <Text style={styles.ratingText}>
            {userReviews.length === 0 ? 'No ratings yet' : average.toFixed(1) + ' (' + userReviews.length + ' reviews)'}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Reviews from advertisers</Text>
      {userReviews.length === 0 ? (
        <Text style={styles.muted}>This user has no reviews yet</Text>
      ) : (
        userReviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}

      <Text style={styles.sectionTitle}>Rate this user</Text>
      <RateForm onSubmit={addReview} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    paddingBottom: 40,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  },
  muted: {
    color: colors.muted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  ratingText: {
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
});