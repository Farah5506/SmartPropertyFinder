import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import UserHomeScreen from '../screens/browse/UserHomeScreen';
import AdvertiserHomeScreen from '../screens/advertiser/AdvertiserHomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
      <Stack.Screen name="AdvertiserHome" component={AdvertiserHomeScreen} />
    </Stack.Navigator>
  );
}