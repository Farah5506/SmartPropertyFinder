import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function ComingSoon({ title, links = [] }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.badge}>Coming soon</Text>

      {links.map((link) => (
        <Pressable
          key={link.route}
          style={styles.button}
          onPress={() => navigation.navigate(link.route)}
        >
          <Text style={styles.buttonText}>{link.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
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
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});