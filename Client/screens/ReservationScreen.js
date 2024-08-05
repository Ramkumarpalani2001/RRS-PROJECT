
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import pattern from '../assets/s9.jpg';
import ipconfig from '../ipconfig';

const timeslots = [
  '08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM', '08:00 PM', '09:30 PM', '11:00 PM'
];

const tables = [
  { id: 'T1' }, { id: 'T2' }, { id: 'T3' },
  { id: 'T4' }, { id: 'T5' }, { id: 'T6' },
  { id: 'T7' }, { id: 'T8' }, { id: 'T9' },
];

const persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ReservationScreen = ({ route, navigation }) => {
  const { restaurantId, restaurantName, companyId } = route.params;

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState(null);
  const [bookedTables, setBookedTables] = useState([]);
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (date && selectedTime) {
      fetchBookedTables(date.toDateString(), selectedTime);
    }
  }, [date, selectedTime]);

  const fetchBookedTables = async (date, time) => {
    try {
      const response = await fetch(`${ipconfig}/table/status?date=${date}&time=${time}&restaurantId=${restaurantId}`);
      if (response.ok) {
        const result = await response.json();
        // console.log('Booked tables:', result); // Debugging line
        const booked = result.map(reservation => reservation.tableId); // Ensure tableId matches your API response
        setBookedTables(booked);
      } else {
        Alert.alert('Error', 'Failed to fetch booked tables.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch booked tables.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDatePickerVisible(false);
  };

  const handleReservation = async () => {
    if (!date || !selectedTime || !reservationDetails.name || !selectedPersons || !selectedTable) {
      Alert.alert('Incomplete Reservation', 'Please fill out all fields.');
      return;
    }
  
    const reservation = {
      restaurantId,
      restaurantName,
      date: date.toDateString(),
      time: selectedTime,
      table: selectedTable,
      persons: selectedPersons,
      name: reservationDetails.name,
      companyId
    };
  
    try {
      // Post reservation data
      const response = await fetch(`${ipconfig}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Post table details data
        const tableDetails = {
          restaurantId,
          restaurantName,
          date: date.toDateString(),
          time: selectedTime,
          tableId: selectedTable,
          status: 'true'
        };
  
        const tableResponse = await fetch(`${ipconfig}/table/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tableDetails)
        });
  
        if (tableResponse.ok) {
          const tableResult = await tableResponse.json();
          Alert.alert('Reservation Confirmed', `Reservation at ${restaurantName} for ${reservationDetails.name} on ${date.toDateString()} at ${selectedTime} for ${selectedPersons} people, with table ${selectedTable}.`);
          navigation.goBack();
        } else {
          // Log the error details for debugging
          const errorDetails = await tableResponse.text();
          console.error('Table Details Error:', errorDetails);
          Alert.alert('Table Details Update Failed', 'Please try again later.');
        }
      } else {
        // Log the error details for debugging
        const errorDetails = await response.text();
        console.error('Reservation Error:', errorDetails);
        Alert.alert('Reservation Failed', 'Please try again later.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('Reservation Failed', 'Please try again later.');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image style={styles.bg} source={pattern} />
      <Text style={styles.header}>Make a Reservation</Text>

      <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.input}>
        <Text style={styles.inputText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.inputText}>Select Time</Text>
      <FlatList
        data={timeslots}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelectedTime(item)} 
            style={[styles.timeSlot, selectedTime === item && styles.selectedSlot]}>
            <Text style={styles.timeSlotText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.inputText}>Select Table</Text>
      <FlatList
        data={tables}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => !bookedTables.includes(item.id) && setSelectedTable(item.id)} 
            style={[
              styles.table, 
              selectedTable === item.id && styles.selectedTable, 
              bookedTables.includes(item.id) && styles.bookedTable
            ]} 
            disabled={bookedTables.includes(item.id)}>
            <Text style={styles.tableText}>{item.id}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />

      <Text style={styles.inputText}>Number of Persons</Text>
      <FlatList
        data={persons}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelectedPersons(item)} 
            style={[styles.person, selectedPersons === item && styles.selectedPerson]}>
            <Text style={styles.personText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={reservationDetails.name}
        onChangeText={(text) => setReservationDetails({ ...reservationDetails, name: text })}
      />

      <TouchableOpacity onPress={handleReservation} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: '#deb887',
    borderRadius: 5,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 18,
    color:'white',
    marginBottom:10,
    textAlign:'center',
    fontWeight:'900'
  },
  textInput: {
    padding: 10,
    backgroundColor: '#808080',
    borderRadius: 5,
    marginBottom: 18,
    fontSize: 16,
    color:'white',
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#2e8b57',
    borderRadius: 5,
    height:40,
    marginRight: 10,
  },
  selectedSlot: {
    backgroundColor: '#008080',
    
  },
  timeSlotText: {
    fontSize: 16,
    color:'white',
    textAlign:'center',
  },
  table: {
    padding: 20,
    backgroundColor: '#a0522d',
    borderRadius: 50,
    margin: 5,
    
  },
  selectedTable: {
    backgroundColor: '#008080',
  },
  bookedTable: {
    backgroundColor: 'gray',
  },
  tableText: {
    fontSize: 16,
    color:'white',
  },
  person: {
    padding: 10,
    backgroundColor: '#deb887',
    height:40,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedPerson: {
    backgroundColor: '#008080',
  },
  personText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3cb371',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
});

export default ReservationScreen;
