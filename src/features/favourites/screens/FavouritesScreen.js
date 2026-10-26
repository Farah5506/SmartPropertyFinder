import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../../../shared/components/PropertyCard';
import { properties, favouriteIds } from '../../../shared/data/mockData';
import colors from '../../../shared/theme/colors';

export default function FavouritesScreen({ navigation }) {
  const [favourites, setFavourites] = useState(
    properties.filter((p) => favouriteIds.includes(p.id))
  );

  function removeFavourite(id) {
    setFavourites(favourites.filter((p) => p.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <Text style={styles.subtitle}>{favourites.length} saved properties</Text>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            actionIcon="heart"
            actionColor={colors.error}
            onActionPress={() => removeFavourite(item.id)}
            onPress={() => navigation.navigate('AdvertiserPublicProfile', { advertiserId: item.advertiserId })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="heart-outline" size={56} color={colors.border} />
            <Text style={styles.emptyTitle}>No favourites yet</Text>
            <Text style={styles.emptyText}>Tap the heart on a property to save it here</Text>
          </View>
        }
      />
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    color: colors.muted,
    marginBottom: 12,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
  },
});