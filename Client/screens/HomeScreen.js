import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import pattern from '../assets/s5.jpg'

function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 2,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={[styles.container,styles.transparentContainer]}>
      <Image style={styles.bg} source={pattern}/>
      <Animated.View style={{ ...styles.headingContainer, opacity: fadeAnim }}>
        <Text style={styles.heading1}>Welcome To</Text>
        <Text style={styles.heading}>Restaurant Reservation System</Text>
      </Animated.View>
      <Animated.View style={{ ...styles.buttonContainer, transform: [{ translateY: slideAnim }] }}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adding transparency
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 460,
    textAlign: 'center',
    fontSize: 30,
    color: '#fff8dc',
  },
  heading1: {
    // fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 30,
    color: '#fff8dc',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffe0',
    color: 'black',
    padding: 10,
    borderRadius: 0,
    fontSize: 20,
    minWidth: 250,
    textAlign: 'center',
    margin: 5,
  },
  bg: {
    position: 'absolute',
    top: -20,
    width: '100%',
    height: '103%',
  },
  transparentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the transparency level as needed
  },
  
});


export default HomeScreen;
