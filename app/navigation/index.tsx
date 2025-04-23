import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Welcome from '../screens/Welcome';
import RecipieDetails from '../screens/RecipieDetails';

// 🔹 Add the correct type for the stack
export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  RecipieDetails: { idMeal: string; strMeal: string; strMealThumb: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // ✅ Apply the type here

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="RecipieDetails" component={RecipieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
