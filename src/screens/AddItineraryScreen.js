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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const AddItineraryScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('activity');
  const [loading, setLoading] = useState(false);

  const categories = ['activity', 'meal', 'transport', 'accommodation', 'other'];

  const handleAddItem = async () => {
    if (!date || !title) {
      Alert.alert('Error', 'Please fill in date and title');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/trips/${tripId}/itinerary_items`, {
        itinerary_item: {
          date: formatDate(date),
          time: time || null,
          title,
          location: location || null,
          notes: notes || null,
          category,
        },
      });

      Alert.alert('Success', 'Activity added!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Date *</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Time (Optional, HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="10:00"
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Visit Uluwatu Temple"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Location (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Uluwatu, Bali"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bring camera and sunscreen"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryGrid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                category === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddItem}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Activity</Text>
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
  textArea: {
    height: 80,
    paddingTop: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  categoryButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#fff',
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
});

export default AddItineraryScreen;