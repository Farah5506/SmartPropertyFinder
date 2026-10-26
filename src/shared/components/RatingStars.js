import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function RatingStars({ rating, size = 18, onSelect }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.row}>
      {stars.map((star) => {
        let icon = 'star-outline';
        if (rating >= star) {
          icon = 'star';
        } else if (rating >= star - 0.5) {
          icon = 'star-half';
        }

        if (onSelect) {
          return (
            <Pressable key={star} onPress={() => onSelect(star)} hitSlop={4}>
              <Ionicons name={icon} size={size} color={colors.accent} />
            </Pressable>
          );
        }
        return <Ionicons key={star} name={icon} size={size} color={colors.accent} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 2,
  },
});