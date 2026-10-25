import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RoleSelector({ role, onChange }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange('user')}
        style={[styles.option, role === 'user' && styles.selected]}
      >
        <Text style={[styles.text, role === 'user' && styles.selectedText]}>User</Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('advertiser')}
        style={[styles.option, role === 'advertiser' && styles.selected]}
      >
        <Text style={[styles.text, role === 'advertiser' && styles.selectedText]}>Advertiser</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  text: {
    fontSize: 15,
    color: '#334155',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
});