import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { formatPrice } from '../utils/formatters';

export default function PropertyCard({ property, onPress, actionIcon, actionColor, onActionPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageBox}>
        <Ionicons name="home-outline" size={34} color={colors.primary} />
        <Text style={styles.typeTag}>{property.type === 'rent' ? 'Rent' : 'Sale'}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
          {actionIcon && (
            <Pressable onPress={onActionPress} hitSlop={10}>
              <Ionicons name={actionIcon} size={22} color={actionColor || colors.primary} />
            </Pressable>
          )}
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {property.compound !== '' ? property.compound + ', ' : ''}{property.location}
        </Text>
        <Text style={styles.details}>{property.rooms} rooms · {property.area} m²</Text>
        <Text style={styles.price}>{formatPrice(property.price, property.type)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTag: {
    position: 'absolute',
    bottom: 6,
    backgroundColor: colors.accent,
    color: colors.primary,
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  location: {
    fontSize: 13,
    color: colors.muted,
  },
  details: {
    fontSize: 13,
    color: colors.muted,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 2,
  },
});