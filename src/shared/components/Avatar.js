import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

// shows the first letters of the name in a circle (no photos yet)
export default function Avatar({ name, size = 72 }) {
  let initials = '?';
  const parts = name.trim().split(' ');

  if (parts[0] !== '') {
    initials = parts[0][0];
    if (parts.length > 1) {
      initials += parts[parts.length - 1][0];
    }
  }

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size / 2.6 }]}>{initials.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  text: {
    color: colors.card,
    fontWeight: 'bold',
  },
});