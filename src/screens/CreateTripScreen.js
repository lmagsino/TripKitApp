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
} from 'react-native';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';

const CreateTripScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('PHP');
  const [totalBudget, setTotalBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!name || !startDate || !endDate) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.TRIPS, {
        trip: {
          name,
          start_date: startDate,
          end_date: endDate,
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

      <Text style={styles.label}>Start Date * (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2024-12-29"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>End Date * (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-01-05"
        value={endDate}
        onChangeText={setEndDate}
      />

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