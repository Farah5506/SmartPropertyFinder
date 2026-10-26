import { View, Text, Pressable } from 'react-native';

export default function AdvertiserHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Advertiser Home (coming soon)</Text>
      <Pressable onPress={() => navigation.replace('Login')}>
        <Text style={{ color: '#2563eb' }}>Log out</Text>
      </Pressable>
    </View>
  );
}