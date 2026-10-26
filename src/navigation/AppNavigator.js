import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../shared/theme/colors';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignupScreen from '../features/auth/screens/SignupScreen';
import UserTabs from './UserTabs';
import AdvertiserTabs from './AdvertiserTabs';
import RentListingsScreen from '../features/properties/screens/RentListingsScreen';
import BuyListingsScreen from '../features/properties/screens/BuyListingsScreen';
import UserPublicProfileScreen from '../features/profiles/screens/UserPublicProfileScreen';
import AdvertiserPublicProfileScreen from '../features/profiles/screens/AdvertiserPublicProfileScreen';

const Stack = createNativeStackNavigator();

// header style for screens that open on top of the tabs
const headerOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.card,
};

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="AdvertiserTabs" component={AdvertiserTabs} />
      <Stack.Screen
        name="RentListings"
        component={RentListingsScreen}
        options={{ ...headerOptions, title: 'For Rent' }}
      />
      <Stack.Screen
        name="BuyListings"
        component={BuyListingsScreen}
        options={{ ...headerOptions, title: 'For Buy' }}
      />
      <Stack.Screen
        name="UserPublicProfile"
        component={UserPublicProfileScreen}
        options={{ ...headerOptions, title: 'User Profile' }}
      />
      <Stack.Screen
        name="AdvertiserPublicProfile"
        component={AdvertiserPublicProfileScreen}
        options={{ ...headerOptions, title: 'Advertiser Profile' }}
      />
    </Stack.Navigator>
  );
}