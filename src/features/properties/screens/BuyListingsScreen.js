import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import PropertyCard from '../../../shared/components/PropertyCard';
import { properties } from '../../../shared/data/mockData';
import colors from '../../../shared/theme/colors';

const sortOptions = [
  { key: 'none', label: 'Default' },
  { key: 'low', label: 'Price: Low' },
  { key: 'high', label: 'Price: High' },
];

export default function BuyListingsScreen({ navigation }) {
  const [sortBy, setSortBy] = useState('none');

  const buyProperties = properties.filter((p) => p.type === 'buy');

  function getSortedList() {
    const list = [...buyProperties];
    if (sortBy === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortRow}>
        {sortOptions.map((option) => (
          <Pressable
            key={option.key}
            onPress={() => setSortBy(option.key)}
            style={[styles.chip, sortBy === option.key && styles.chipSelected]}
          >
            <Text style={[styles.chipText, sortBy === option.key && styles.chipTextSelected]}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.count}>{buyProperties.length} properties for sale</Text>

      <FlatList
        data={getSortedList()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => navigation.navigate('AdvertiserPublicProfile', { advertiserId: item.advertiserId })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No properties for sale right now</Text>}
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
  sortRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: 13,
  },
  chipTextSelected: {
    color: colors.card,
    fontWeight: '600',
  },
  count: {
    color: colors.muted,
    marginVertical: 12,
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