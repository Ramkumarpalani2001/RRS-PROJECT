import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import pattern from '../assets/black.jpg';
import ipconfig from "../ipconfig";

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [restaurant, setRestaurant] = useState(null);
  const [currentMenu, setCurrentMenu] = useState('Breakfast');

  useEffect(() => {
    axios.get(`${ipconfig}/restaurants/${id}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleMenuChange = (menuType) => {
    setCurrentMenu(menuType);
  };

  const handleReservation = () => {
    navigation.navigate('Reservation', { restaurantName: restaurant.name , restaurantId:id});
  };

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

  const menu = restaurant[currentMenu] || [];

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={pattern} />
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
      <Text style={styles.location}>Location: {restaurant.location}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>

      <View style={styles.menuButtons}>
        {['Breakfast', 'Lunch', 'Dinner'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.button, currentMenu === type && styles.selectedButton]}
            onPress={() => handleMenuChange(type)}
          >
            <Text style={styles.buttonText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.menuHeader}>{currentMenu} Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleReservation}>
        <Text style={styles.reservationButton}>Make a Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  rating: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  location: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  menuHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
  },
  menuItemPrice: {
    fontSize: 16,
    color: 'white',
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: '110%',
    height: '110%',
  },
  button: {
    backgroundColor: '#3cb371',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    minWidth: 100,
    textAlign: 'center',
    margin: 5,
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign:'center',
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor:"#2f4f4f",
    
  },
  reservationButton: {
    backgroundColor: '#3cb371',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    minWidth: 100,
    textAlign: 'center',
    margin: 5,
  },
});

export default RestaurantDetailsScreen;
