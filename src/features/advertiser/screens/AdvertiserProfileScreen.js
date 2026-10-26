import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import Avatar from '../../../shared/components/Avatar';
import RatingStars from '../../../shared/components/RatingStars';
import ReviewItem from '../../../shared/components/ReviewItem';
import { properties, reviews, currentAdvertiser } from '../../../shared/data/mockData';
import { getAverageRating } from '../../../shared/utils/formatters';
import { isValidEmail, isValidPhone } from '../../../shared/utils/validators';
import colors from '../../../shared/theme/colors';

export default function AdvertiserProfileScreen() {
  const [profile, setProfile] = useState(currentAdvertiser);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentAdvertiser.name);
  const [company, setCompany] = useState(currentAdvertiser.company);
  const [phone, setPhone] = useState(currentAdvertiser.phone);
  const [email, setEmail] = useState(currentAdvertiser.email);
  const [error, setError] = useState('');

  const myReviews = reviews.filter((r) => r.targetId === profile.id);
  const listingsCount = properties.filter((p) => p.advertiserId === profile.id).length;
  const average = getAverageRating(myReviews);

  function handleCancel() {
    setName(profile.name);
    setCompany(profile.company);
    setPhone(profile.phone);
    setEmail(profile.email);
    setError('');
    setEditing(false);
  }

  function handleSave() {
    if (name.trim() === '' || company.trim() === '' || phone.trim() === '' || email.trim() === '') {
      setError('Please fill in all fields');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number (e.g. 01012345678)');
      return;
    }

    setError('');
    setProfile({ ...profile, name: name.trim(), company: company.trim(), phone: phone.trim(), email: email.trim() });
    setEditing(false);
    Alert.alert('Saved', 'Your profile was updated');
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Avatar name={profile.name} size={84} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.company}>{profile.company}</Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={average} />
          <Text style={styles.ratingText}>{average.toFixed(1)} ({myReviews.length} reviews)</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{listingsCount}</Text>
          <Text style={styles.statLabel}>Listings</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{myReviews.length}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile.memberSince}</Text>
          <Text style={styles.statLabel}>Member since</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account details</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput value={name} onChangeText={setName} editable={editing} style={[styles.input, !editing && styles.inputDisabled]} />

      <Text style={styles.label}>Company</Text>
      <TextInput value={company} onChangeText={setCompany} editable={editing} style={[styles.input, !editing && styles.inputDisabled]} />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        editable={editing}
        keyboardType="phone-pad"
        maxLength={11}
        style={[styles.input, !editing && styles.inputDisabled]}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        editable={editing}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, !editing && styles.inputDisabled]}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {editing ? (
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={() => setEditing(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      )}

      <Text style={styles.sectionTitle}>What clients say</Text>
      {myReviews.length === 0 ? (
        <Text style={styles.empty}>No reviews yet</Text>
      ) : (
        myReviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 10,
  },
  header: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  },
  company: {
    color: colors.muted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  ratingText: {
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputDisabled: {
    backgroundColor: colors.background,
    color: colors.muted,
  },
  error: {
    color: colors.error,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cancelText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    color: colors.muted,
  },
});