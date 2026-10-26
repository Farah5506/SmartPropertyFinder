import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../shared/theme/colors';
import AdvertiserHomeScreen from '../features/advertiser/screens/AdvertiserHomeScreen';
import PostPropertyScreen from '../features/advertiser/screens/PostPropertyScreen';
import MapScreen from '../features/map/screens/MapScreen';
import AdvertiserProfileScreen from '../features/advertiser/screens/AdvertiserProfileScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Home: 'home-outline',
  Post: 'add-circle-outline',
  Map: 'map-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
};

export default function AdvertiserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={AdvertiserHomeScreen} />
      <Tab.Screen name="Post" component={PostPropertyScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={AdvertiserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}