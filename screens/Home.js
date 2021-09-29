import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{uri:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_170315.png&f=1&nofb=1'}}
                    style={styles.logo}
                    resizeMode='contain'
                />
                
            </View>

            {/* Footer: the sign in section */}
            <View style={styles.footer}>
                
                {/* Welcome message */}
                <Text style={styles.title}>Welcome 2 HareBue ChatApp</Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>

                {/* Button Sign In and Sign Up */}
                <View style={styles.login}>
                    <TouchableOpacity style={styles.touch1} onPress={() => navigation.navigate('Login')}>
                        <Text  style={styles.textLog}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch2} onPress={() => navigation.navigate('Sign')}>
                        <Text  style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

{/* Setting height of the logo to our screen and calculating the size */}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

{/* Styles */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 100,
    width: height_logo,
    height: height_logo,
  },
  text: {
    color: '#000',
    marginTop: 10,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30
  },
  login: {
    flexDirection: 'row', 
    margin: 20, 
    paddingVertical: 20,
    justifyContent: 'center',
  },
  textLog: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  textSignUp: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  touch1: {
    backgroundColor: '#000',
    width: 150,
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 2,
  },
  touch2: {
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 2,
  },
});

export default Home;