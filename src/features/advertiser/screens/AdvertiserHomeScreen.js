import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../../../shared/components/PropertyCard';
import Avatar from '../../../shared/components/Avatar';
import { properties, users, inquiries, currentAdvertiser } from '../../../shared/data/mockData';
import colors from '../../../shared/theme/colors';

export default function AdvertiserHomeScreen({ navigation }) {
  const [myListings, setMyListings] = useState(
    properties.filter((p) => p.advertiserId === currentAdvertiser.id)
  );
  const [search, setSearch] = useState('');

  const filteredListings = myListings.filter((p) => {
    const text = search.toLowerCase();
    return p.title.toLowerCase().includes(text) || p.location.toLowerCase().includes(text);
  });

  function handleDelete(property) {
    Alert.alert('Delete property', 'Are you sure you want to delete "' + property.title + '"?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setMyListings(myListings.filter((p) => p.id !== property.id)),
      },
    ]);
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Text style={styles.hello}>Hello, {currentAdvertiser.name.split(' ')[0]}</Text>
      <Text style={styles.title}>My Listings</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search my properties"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      <Pressable style={styles.postButton} onPress={() => navigation.navigate('Post')}>
        <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
        <Text style={styles.postButtonText}>Post a new property</Text>
      </Pressable>

      {filteredListings.length === 0 ? (
        <Text style={styles.empty}>
          {myListings.length === 0 ? 'You have no listings yet' : 'No results for "' + search + '"'}
        </Text>
      ) : (
        filteredListings.map((item) => (
          <PropertyCard
            key={item.id}
            property={item}
            actionIcon="trash-outline"
            actionColor={colors.error}
            onActionPress={() => handleDelete(item)}
          />
        ))
      )}

      <Text style={styles.sectionTitle}>Interested users</Text>

      {inquiries.map((inquiry) => {
        const user = users.find((u) => u.id === inquiry.userId);
        const property = properties.find((p) => p.id === inquiry.propertyId);
        if (!user || !property) {
          return null;
        }
        return (
          <Pressable
            key={inquiry.id}
            style={styles.userRow}
            onPress={() => navigation.navigate('UserPublicProfile', { userId: user.id })}
          >
            <Avatar name={user.name} size={42} />
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userProperty}>Asked about: {property.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  hello: {
    color: colors.muted,
    fontSize: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  postButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 12,
  },
  postButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: colors.muted,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  userName: {
    fontWeight: 'bold',
    color: colors.text,
  },
  userProperty: {
    color: colors.muted,
    fontSize: 13,
  },
});