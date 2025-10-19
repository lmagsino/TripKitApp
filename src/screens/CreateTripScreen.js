import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';

const CreateTripScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState('PHP');
  const [totalBudget, setTotalBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleCreateTrip = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter trip name');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.TRIPS, {
        trip: {
          name,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
          base_currency: baseCurrency,
          active_currency: baseCurrency,
          total_budget: totalBudget || 0,
        },
      });

      Alert.alert(
        'Success',
        `Trip created! Invite code: ${response.data.invite_code}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Trip Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Bali Adventure"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Start Date *</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(startDate)}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}

      <Text style={styles.label}>End Date *</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(endDate)}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate}
        />
      )}

      <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
        placeholder="PHP"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
      />

      <Text style={styles.label}>Total Budget (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="50000"
        value={totalBudget}
        onChangeText={setTotalBudget}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateTrip}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Trip</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateTripScreen;