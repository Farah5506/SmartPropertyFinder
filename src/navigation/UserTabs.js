import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../shared/theme/colors';
import UserHomeScreen from '../features/properties/screens/UserHomeScreen';
import FavouritesScreen from '../features/favourites/screens/FavouritesScreen';
import MapScreen from '../features/map/screens/MapScreen';
import UserProfileScreen from '../features/profiles/screens/UserProfileScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Home: 'home-outline',
  Favourites: 'heart-outline',
  Map: 'map-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
};

export default function UserTabs() {
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
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}