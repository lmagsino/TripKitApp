import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateTripScreen from './src/screens/CreateTripScreen';
import JoinTripScreen from './src/screens/JoinTripScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'My Trips',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen 
          name="CreateTrip" 
          component={CreateTripScreen}
          options={{ title: 'Create Trip' }}
        />
        <Stack.Screen 
          name="JoinTrip" 
          component={JoinTripScreen}
          options={{ title: 'Join Trip' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;