import { View, Text, Pressable, StyleSheet } from 'react-native';
import colors from '../../../shared/theme/colors';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.badge}>Coming soon</Text>

      <Pressable style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  badge: {
    color: colors.accent,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: colors.card,
    fontWeight: '600',
  },
});