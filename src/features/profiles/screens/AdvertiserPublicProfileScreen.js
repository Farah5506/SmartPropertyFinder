// User views an advertiser's profile, listings and ratings
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../../shared/components/Avatar';
import RatingStars from '../../../shared/components/RatingStars';
import ReviewItem from '../../../shared/components/ReviewItem';
import PropertyCard from '../../../shared/components/PropertyCard';
import RateForm from '../components/RateForm';
import { advertisers, properties, reviews, currentUser } from '../../../shared/data/mockData';
import { getAverageRating } from '../../../shared/utils/formatters';
import colors from '../../../shared/theme/colors';

export default function AdvertiserPublicProfileScreen({ route }) {
  // if no id is passed, show the first advertiser (for testing)
  const advertiserId = route.params?.advertiserId || 'a1';
  const advertiser = advertisers.find((a) => a.id === advertiserId);

  const [advertiserReviews, setAdvertiserReviews] = useState(
    reviews.filter((r) => r.targetId === advertiserId)
  );

  if (!advertiser) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.muted}>Advertiser not found</Text>
      </View>
    );
  }

  const listings = properties.filter((p) => p.advertiserId === advertiser.id);
  const average = getAverageRating(advertiserReviews);

  function handleCall() {
    Linking.openURL('tel:' + advertiser.phone).catch(() => {
      Alert.alert('Error', 'Could not open the phone app');
    });
  }

  function addReview(stars, comment) {
    const newReview = {
      id: Date.now().toString(),
      targetId: advertiser.id,
      reviewerName: currentUser.name,
      stars: stars,
      comment: comment,
    };
    setAdvertiserReviews([newReview, ...advertiserReviews]);
    Alert.alert('Thank you', 'Your rating was added');
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Avatar name={advertiser.name} size={84} />
        <Text style={styles.name}>{advertiser.name}</Text>
        <Text style={styles.company}>{advertiser.company}</Text>
        <Text style={styles.muted}>Member since {advertiser.memberSince}</Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={average} size={20} />
          <Text style={styles.ratingText}>
            {advertiserReviews.length === 0 ? 'No ratings yet' : average.toFixed(1) + ' (' + advertiserReviews.length + ' reviews)'}
          </Text>
        </View>

        <Pressable style={styles.callButton} onPress={handleCall}>
          <Ionicons name="call-outline" size={18} color={colors.primary} />
          <Text style={styles.callText}>Call {advertiser.phone}</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Listings ({listings.length})</Text>
      {listings.length === 0 ? (
        <Text style={styles.muted}>No listings right now</Text>
      ) : (
        listings.map((item) => <PropertyCard key={item.id} property={item} />)
      )}

      <Text style={styles.sectionTitle}>Reviews</Text>
      {advertiserReviews.length === 0 ? (
        <Text style={styles.muted}>Be the first to rate this advertiser</Text>
      ) : (
        advertiserReviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}

      <Text style={styles.sectionTitle}>Rate this advertiser</Text>
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
  company: {
    color: colors.text,
    fontWeight: '600',
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
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 12,
  },
  callText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
});