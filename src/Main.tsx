import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTransactionScreen from './screens/TransactionScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {backgroundColor: '#D90166'},
          headerTitleStyle: {color: '#FFF'},
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Transactions'}}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={({route}) => ({
            title: route.params ? 'Edit Transaction' : 'Add Transaction',
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
