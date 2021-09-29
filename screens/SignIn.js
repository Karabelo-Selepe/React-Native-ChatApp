import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../Firebase';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    {/* fetching email and password from firebase auth and 
        comparing them to the values entered to login to app */}

    const loginUser = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User signed in! => ', user.uid); // checking if works
            // ...
            })
            .catch((error) => {
                alert('Something went wrong! - ' + error)
            });
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>

                {/* Welcome message */}
                <Text style={styles.text_header}>Sign In</Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    ed do eiusmod.
                </Text>
            </View>
            <View style={styles.footer}> 
                <View style={styles.login} >
                    <TextInput style={styles.inputBox} 
                        placeholder='Email' 
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={styles.login} >
                    <TextInput style={styles.inputBox} 
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.touch1} onPress={loginUser}>
                      <Text style={styles.textLog}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  touch1: {
    backgroundColor: '#000',
    width: 280,
    borderRadius: 50,
    padding: 15,
  },
   login: {
    flexDirection: 'row', 
    margin: 5, 
    justifyContent: 'center',
  },
  textLog: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    width: 285,
    height: 55,
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
   text: {
    color: '#000',
    marginTop: 10,
  },
});

export default SignIn;