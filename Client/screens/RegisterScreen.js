import React, { useState } from 'react';
import { View, Text, TextInput,  TouchableOpacity , StyleSheet, Alert, Image } from 'react-native';
import pattern from '../assets/s8.jpg'
import ipconfig from "../ipconfig"

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`${ipconfig}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.status === 201) {
        console.log('User registered successfully');
        Alert.alert('SignUp Success');
        navigation.navigate('Login');
      } else {
        const responseText = await response.text();
        console.error('Error registering user. Status code: ' + response.status);
        Alert.alert('Error', `Failed to register user: ${responseText}`);
      }
    } catch (error) {
      console.error('Error registering user', error);
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={pattern}/>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={handleConfirmPasswordChange}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>SignUp</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    backgroundColor: '#deb887',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    width: '80%',
    marginVertical: 8,
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: '110%',
    height: '115%',
  },
  button: {
    backgroundColor: '#3cb371',
    color: 'white',
    padding: 10,
    borderRadius: 0,
    fontSize: 20,
    minWidth: 150,
    textAlign: 'center',
    margin: 10,
  },
});

export default RegisterScreen;
