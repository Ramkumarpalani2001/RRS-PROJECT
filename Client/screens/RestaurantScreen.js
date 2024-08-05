import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import pattern from '../assets/s1.jpg';
import ipconfig from "../ipconfig"

const RestaurantScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fetch restaurants from the backend
    axios.get(`${ipconfig}/restaurants`)
      .then(response => {
        // console.log('API Response:', response.data); // Log the response data
        setRestaurants(response.data);
        setLoading(false);
        // Start fade-in animation after data is loaded
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch(error => {
        console.error('API Error:', error); // Log the error
        setLoading(false);
      });
  }, []);

  const handlePress = (restaurantId) => {
    // Navigate to restaurant details screen with restaurant ID
    navigation.navigate('RestaurantDetails', { id: restaurantId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image style={styles.bg} source={pattern} />
      <Text style={styles.header}>Available Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id.toString()} // Ensure _id is a string
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item._id)} // Pass _id to the details screen
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <Text style={styles.location}>Location: {item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* <Button
        title="Make a Reservation"
        onPress={() => navigation.navigate('Reservation')}
      /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#0000ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Change text color to white for better contrast with background
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e6e6fa',
    borderBottomWidth: 1,
    borderBottomColor: '#556b2f',
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: '#dc143c',
  },
  location: {
    fontSize: 16,
    color: '#008b8b',
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: '110%',
    height: '106%',
  },
});

export default RestaurantScreen;
