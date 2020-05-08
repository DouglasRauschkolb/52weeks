import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Goal from './pages/Goal';
import Detail from './pages/Detail';
//<AppStack.Screen name="Detail" component={Detail} />

export default function Routes(){
  return(
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Goal" component={Goal} />
        
      </AppStack.Navigator>

    </NavigationContainer>
  );
}