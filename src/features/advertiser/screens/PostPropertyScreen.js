import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import colors from '../../../shared/theme/colors';

export default function PostPropertyScreen() {
  const [type, setType] = useState('rent');
  const [location, setLocation] = useState('');
  const [compound, setCompound] = useState('');
  const [address, setAddress] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function isValidMapsLink(link) {
    return (
      link.startsWith('https://maps.google') ||
      link.startsWith('https://www.google.com/maps') ||
      link.startsWith('https://maps.app.goo.gl') ||
      link.startsWith('https://goo.gl/maps')
    );
  }

  function clearForm() {
    setType('rent');
    setLocation('');
    setCompound('');
    setAddress('');
    setMapsLink('');
    setPrice('');
    setDescription('');
  }

  function handlePost() {
    if (location.trim() === '' || address.trim() === '' || mapsLink.trim() === '' ||
        price.trim() === '' || description.trim() === '') {
      setError('Please fill in all required fields');
      return;
    }
    if (!isValidMapsLink(mapsLink.trim())) {
      setError('Please enter a valid Google Maps link');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }
    if (description.trim().length < 20) {
      setError('Description must be at least 20 characters');
      return;
    }

    setError('');

    
    Alert.alert('Property posted', 'Your property is now listed', [
      { text: 'OK', onPress: clearForm },
    ]);
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Post a Property</Text>
      <Text style={styles.subtitle}>Fill in the property details</Text>

      <Text style={styles.label}>Listing type</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => setType('rent')}
          style={[styles.option, type === 'rent' && styles.selected]}
        >
          <Text style={[styles.optionText, type === 'rent' && styles.selectedText]}>For Rent</Text>
        </Pressable>
        <Pressable
          onPress={() => setType('buy')}
          style={[styles.option, type === 'buy' && styles.selected]}
        >
          <Text style={[styles.optionText, type === 'buy' && styles.selectedText]}>For Sale</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Location *</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. New Cairo"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Compound name (optional)</Text>
      <TextInput
        value={compound}
        onChangeText={setCompound}
        placeholder="e.g. Madinaty"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Detailed address *</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Building, street, floor, apartment number"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Google Maps link *</Text>
      <TextInput
        value={mapsLink}
        onChangeText={setMapsLink}
        placeholder="https://maps.app.goo.gl/..."
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="url"
        style={styles.input}
      />

      <Text style={styles.label}>{type === 'rent' ? 'Monthly rent (EGP) *' : 'Price (EGP) *'}</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 15000"
        placeholderTextColor={colors.muted}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Apartment description *</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Rooms, bathrooms, area, finishing, view..."
        placeholderTextColor={colors.muted}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />
      <Text style={styles.hint}>{description.trim().length} / 20 characters minimum</Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post Property</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.text,
  },
  selectedText: {
    color: colors.card,
    fontWeight: '600',
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
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 13,
    color: colors.muted,
  },
  error: {
    color: colors.error,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});