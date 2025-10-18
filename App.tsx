import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateTripScreen from './src/screens/CreateTripScreen';
import JoinTripScreen from './src/screens/JoinTripScreen';
import TripDashboardScreen from './src/screens/TripDashboardScreen';
import ExpenseListScreen from './src/screens/ExpenseListScreen';
import SettlementScreen from './src/screens/SettlementScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ItineraryListScreen from './src/screens/ItineraryListScreen';
import AddItineraryScreen from './src/screens/AddItineraryScreen';
import DocumentListScreen from './src/screens/DocumentListScreen';
import AddDocumentScreen from './src/screens/AddDocumentScreen';

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
        <Stack.Screen 
          name="TripDashboard" 
          component={TripDashboardScreen}
          options={{ title: 'Trip Details' }}
        />
        <Stack.Screen 
          name="ExpenseList" 
          component={ExpenseListScreen}
          options={{ title: 'Expenses' }}
        />
        <Stack.Screen 
          name="Settlement" 
          component={SettlementScreen}
          options={{ title: 'Settlement' }}
        />
        <Stack.Screen 
          name="AddExpense" 
          component={AddExpenseScreen}
          options={{ title: 'Add Expense' }}
        />
        <Stack.Screen 
          name="ItineraryList" 
          component={ItineraryListScreen}
          options={{ title: 'Itinerary' }}
        />
        <Stack.Screen 
          name="AddItinerary" 
          component={AddItineraryScreen}
          options={{ title: 'Add Activity' }}
        />
        <Stack.Screen 
          name="DocumentList" 
          component={DocumentListScreen}
          options={{ title: 'Documents' }}
        />
        <Stack.Screen 
          name="AddDocument" 
          component={AddDocumentScreen}
          options={{ title: 'Add Document' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;