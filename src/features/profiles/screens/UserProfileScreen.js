import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import Avatar from '../../../shared/components/Avatar';
import RatingStars from '../../../shared/components/RatingStars';
import { reviews, favouriteIds, currentUser } from '../../../shared/data/mockData';
import { getAverageRating } from '../../../shared/utils/formatters';
import { isValidEmail, isValidPhone } from '../../../shared/utils/validators';
import colors from '../../../shared/theme/colors';

export default function UserProfileScreen() {
  const [profile, setProfile] = useState(currentUser);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [error, setError] = useState('');

  const myReviews = reviews.filter((r) => r.targetId === profile.id);
  const average = getAverageRating(myReviews);

  const hasChanges = name !== profile.name || phone !== profile.phone || email !== profile.email;

  function handleSave() {
    if (name.trim() === '' || phone.trim() === '' || email.trim() === '') {
      setError('Please fill in all fields');
      return;
    }
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters');
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
    setProfile({ ...profile, name: name.trim(), phone: phone.trim(), email: email.trim() });
    Alert.alert('Saved', 'Your profile was updated');
  }

  function handleReset() {
    setName(profile.name);
    setPhone(profile.phone);
    setEmail(profile.email);
    setError('');
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.headerCard}>
        <Avatar name={name} size={72} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.muted}>Member since {profile.memberSince}</Text>
          <View style={styles.ratingRow}>
            <RatingStars rating={average} size={16} />
            <Text style={styles.muted}>({myReviews.length})</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{favouriteIds.length}</Text>
          <Text style={styles.statLabel}>Favourites</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{average.toFixed(1)}</Text>
          <Text style={styles.statLabel}>My rating</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Edit information</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="01012345678"
        placeholderTextColor={colors.muted}
        keyboardType="phone-pad"
        maxLength={11}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        placeholderTextColor={colors.muted}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.button, !hasChanges && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={!hasChanges}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>

      {hasChanges && (
        <Pressable onPress={handleReset}>
          <Text style={styles.link}>Undo changes</Text>
        </Pressable>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  muted: {
    color: colors.muted,
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    marginTop: 10,
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
  error: {
    color: colors.error,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 24,
  },
});