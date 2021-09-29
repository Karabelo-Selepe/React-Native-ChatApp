import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { auth } from './Firebase';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Chat from './screens/Chat';
import Users from './screens/Users';

const Stack = createStackNavigator();

const myOptions = {
  headerShown: false,
}
 
function App() {

  const [user, setUser] = useState('')

  useEffect(() => {
    const unregister = auth.onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist)
      } else {
        setUser('')
      }
    })

    return () => {
      unregister()
    }
  }, [])

  return (
    <View style={styles.container}>

      <Stack.Navigator>
        {user?
          <>    
            <Stack.Screen name='Users' options={{title: 'HareBue ChatApp'}} >
              {props => <Users {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name='Chat' options={({ route }) => ({ title: route.params.name })}>
              {props => <Chat {...props} user={user} />}
            </Stack.Screen>
          </>
          :
          <>
            <Stack.Screen name='Home' component={Home} options={myOptions} />
            <Stack.Screen name='Login' component={SignIn} />
            <Stack.Screen name='Sign' component={SignUp}  />           
          </>
        }
        
      </Stack.Navigator>
    
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});