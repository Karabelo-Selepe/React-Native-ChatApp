import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../Firebase';

const SignUp = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    {/* Sending user information to firestore */}
    const registerUser =  () => {
        {/** */}
        if(!name || !email || !password) {
            alert('Please add all the fields!')
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {

                const user = userCredential.user;
                
                return db.collection("users").doc(user.uid).set({
                    uid: user.uid,
                    name: name,
                    email: user.email,
                });
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
                <Text style={styles.text_header}>Sign Up</Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    ed do eiusmod.
                </Text>
            </View>

            <View style={styles.footer}> 
                <View style={styles.login} >
                    <TextInput style={styles.inputBox} 
                        placeholder='Name' 
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
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
                    <TouchableOpacity style={styles.touch1} onPress={ registerUser }>
                      <Text style={styles.textLog}>Sign Up</Text>
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

export default SignUp;