import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import PropertyCard from '../../../shared/components/PropertyCard';
import { properties } from '../../../shared/data/mockData';
import colors from '../../../shared/theme/colors';

const roomOptions = [
  { key: 0, label: 'Any' },
  { key: 1, label: '1' },
  { key: 2, label: '2' },
  { key: 3, label: '3+' },
];

export default function RentListingsScreen({ navigation }) {
  const [rooms, setRooms] = useState(0);
  const [cheapestFirst, setCheapestFirst] = useState(false);

  const rentProperties = properties.filter((p) => p.type === 'rent');

  function getList() {
    let list = rentProperties.filter((p) => {
      if (rooms === 0) {
        return true;
      }
      if (rooms === 3) {
        return p.rooms >= 3;
      }
      return p.rooms === rooms;
    });

    if (cheapestFirst) {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }

  const list = getList();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bedrooms</Text>
      <View style={styles.chipRow}>
        {roomOptions.map((option) => (
          <Pressable
            key={option.key}
            onPress={() => setRooms(option.key)}
            style={[styles.chip, rooms === option.key && styles.chipSelected]}
          >
            <Text style={[styles.chipText, rooms === option.key && styles.chipTextSelected]}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.topRow}>
        <Text style={styles.count}>{list.length} properties for rent</Text>
        <Pressable onPress={() => setCheapestFirst(!cheapestFirst)}>
          <Text style={styles.sortLink}>{cheapestFirst ? 'Cheapest first ✓' : 'Sort: cheapest first'}</Text>
        </Pressable>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => navigation.navigate('AdvertiserPublicProfile', { advertiserId: item.advertiserId })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No rentals with this number of bedrooms</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.card,
    fontWeight: '600',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  count: {
    color: colors.muted,
  },
  sortLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 40,
  },
});