// imports
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { auth, db } from '../Firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// ...
const Users = ({user, navigation}) => {

    // ...
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                <TouchableOpacity style={{padding: 10}} onPress={SignOut}>
                    <MaterialCommunityIcons name="logout" size={25} color="black" />
                </TouchableOpacity>
            )
        })
       
    }, [])

    // ...
    const SignOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Home');

        }).catch((error) => {
            // An error happened
            alert('Somehing went wrong! - ' + error);
        });
    }

    // Get all users from firestore
    const [users, setUsers] = useState(null)

    const getUsers = async () => {
        const querySnap = await db.collection('users').where('uid', '!=', user.uid).get()
        const allUsers = querySnap.docs.map(docSnap => docSnap.data())

        setUsers(allUsers)
    }

    useEffect(() => {
        getUsers()
    },[])

    // ...
    const RenderCard = ({item}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.name})}>
                <View style={styles.myCard}>
                    <Image 
                        source={{uri:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconbolt.com%2Fpreview%2Ffacebook%2Fthose-icons-glyph%2Fuser-symbol-person.svg&f=1&nofb=1'}}
                        style={styles.img}
                    />
                    <View>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <Text style={styles.text}>
                            {item.email}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({item}) => { return <RenderCard item={item} />}}
                keyExtractor={(item) => item.uid}
            />
        </View>
    )
}

// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  img: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'grey',
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  myCard: {
    flexDirection: 'row',
    margin: 4,
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  }
});

export default Users;
