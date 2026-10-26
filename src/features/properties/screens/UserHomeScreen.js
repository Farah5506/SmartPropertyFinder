import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../../../shared/components/PropertyCard';
import { properties, favouriteIds, currentUser } from '../../../shared/data/mockData';
import colors from '../../../shared/theme/colors';

const sortOptions = [
  { key: 'none', label: 'Default' },
  { key: 'low', label: 'Price: Low to High' },
  { key: 'high', label: 'Price: High to Low' },
];

const typeOptions = [
  { key: 'all', label: 'All' },
  { key: 'rent', label: 'Rent' },
  { key: 'buy', label: 'Buy' },
];

export default function UserHomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showOptions, setShowOptions] = useState(false);
  const [favourites, setFavourites] = useState(favouriteIds);

  function toggleFavourite(id) {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((favId) => favId !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  function getList() {
    const text = search.toLowerCase().trim();

    let list = properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(text) ||
        p.location.toLowerCase().includes(text) ||
        p.compound.toLowerCase().includes(text);
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      return matchesSearch && matchesType;
    });

    if (sortBy === 'low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }

  function resetOptions() {
    setSortBy('none');
    setTypeFilter('all');
  }

  const list = getList();
  const optionsActive = sortBy !== 'none' || typeFilter !== 'all';

  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello, {currentUser.name.split(' ')[0]}</Text>
      <Text style={styles.title}>Find your next home</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by area, compound..."
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />
          {search !== '' && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          )}
        </View>

        <Pressable
          style={[styles.optionsButton, optionsActive && styles.optionsButtonActive]}
          onPress={() => setShowOptions(true)}
        >
          <Ionicons name="options-outline" size={22} color={optionsActive ? colors.card : colors.primary} />
        </Pressable>
      </View>

      <View style={styles.quickRow}>
        <Pressable style={styles.quickButton} onPress={() => navigation.navigate('RentListings')}>
          <Ionicons name="key-outline" size={18} color={colors.primary} />
          <Text style={styles.quickText}>For Rent</Text>
        </Pressable>
        <Pressable style={styles.quickButton} onPress={() => navigation.navigate('BuyListings')}>
          <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
          <Text style={styles.quickText}>For Sale</Text>
        </Pressable>
      </View>

      <Text style={styles.count}>{list.length} properties available</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            actionIcon={favourites.includes(item.id) ? 'heart' : 'heart-outline'}
            actionColor={colors.error}
            onActionPress={() => toggleFavourite(item.id)}
            onPress={() => navigation.navigate('AdvertiserPublicProfile', { advertiserId: item.advertiserId })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>No properties match your search</Text>
          </View>
        }
      />

      <Modal visible={showOptions} transparent animationType="slide" onRequestClose={() => setShowOptions(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sort & Filter</Text>

            <Text style={styles.modalLabel}>Sort by</Text>
            {sortOptions.map((option) => (
              <Pressable key={option.key} style={styles.radioRow} onPress={() => setSortBy(option.key)}>
                <Ionicons
                  name={sortBy === option.key ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.radioText}>{option.label}</Text>
              </Pressable>
            ))}

            <Text style={styles.modalLabel}>Property type</Text>
            <View style={styles.chipRow}>
              {typeOptions.map((option) => (
                <Pressable
                  key={option.key}
                  onPress={() => setTypeFilter(option.key)}
                  style={[styles.chip, typeFilter === option.key && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, typeFilter === option.key && styles.chipTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.resetButton]} onPress={resetOptions}>
                <Text style={styles.resetText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setShowOptions(false)}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 60,
  },
  hello: {
    color: colors.muted,
    fontSize: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 14,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBox: {
    flex: 1,
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
  optionsButton: {
    width: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsButtonActive: {
    backgroundColor: colors.primary,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 12,
  },
  quickText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  count: {
    color: colors.muted,
    marginVertical: 12,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  emptyText: {
    color: colors.muted,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalBox: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  radioText: {
    color: colors.text,
    fontSize: 15,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
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
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  resetText: {
    color: colors.primary,
    fontWeight: '600',
  },
  applyText: {
    color: colors.card,
    fontWeight: '600',
  },
});