import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Animated, TouchableOpacity ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import pattern from '../assets/s8.jpg'
import ipconfig from "../ipconfig"

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(),
    ]);
  }, [fadeAnim, slideAnim]);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${ipconfig}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        console.log('Login successful');
        navigation.navigate('Restaurant');
      } else if (response.status === 401) {
        alert('Incorrect email or password');
        Alert.alert('Authentication Failed', 'Incorrect email or password');
      } else {
        console.log('Login error');
        Alert.alert('Authentication Failed', 'An error occurred during login');
      }
    } catch (error) {
      console.error('Error logging in', error);
      Alert.alert('Error', 'An error occurred while attempting to log in');
    }
  };

  return (
    <View style={styles.container}>
    <Image style={styles.bg} source={pattern}/>
    <Animated.View style={{ ...styles.headerContainer, opacity: fadeAnim }}>
      <Text style={styles.header}>Restaurant Reservation System</Text>
      <Text style={styles.header1}>Login</Text>
    </Animated.View>
    <Animated.View style={{ ...styles.formContainer, transform: [{ translateY: slideAnim }] }}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </Animated.View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
},
headerContainer: {
  alignItems: 'center',
  marginBottom: 20,
},
header: {
  fontWeight: '900',
  fontSize: 25,
  color: 'white',
  marginBottom:10,
  textAlign: 'center',
},
header1:{
  fontWeight: '900',
  fontSize: 25,
  color: 'white',
  marginBottom:10,
  textAlign: 'center',
},
formContainer: {
  alignItems: 'center',
},
input: {
  backgroundColor: '#deb887',
  padding: 10,
  borderRadius: 0,
  fontSize: 20,
  minWidth: 250,
  textAlign: 'center',
  margin: 5,
  color: 'white',
},
button: {
  backgroundColor: '#3cb371',
  color: 'white',
  padding: 10,
  borderRadius: 0,
  fontSize: 20,
  minWidth: 100,
  textAlign: 'center',
  margin: 5,
},
bg: {
  position: 'absolute',
  top: 0,
  width: '110%',
  height: '105%',
},
});

export default LoginScreen;
