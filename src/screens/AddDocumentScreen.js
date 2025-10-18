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

const AddDocumentScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const types = ['passport', 'visa', 'flight', 'hotel', 'insurance', 'other'];

  const handleAddDocument = async () => {
    if (!title || !documentType) {
      Alert.alert('Error', 'Please fill in title and document type');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/trips/${tripId}/documents`, {
        document: {
          title,
          document_type: documentType,
          notes: notes || null,
        },
      });

      Alert.alert('Success', 'Document added!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Passport Copy"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Document Type *</Text>
      <View style={styles.typeGrid}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              documentType === type && styles.typeButtonActive,
            ]}
            onPress={() => setDocumentType(type)}
          >
            <Text
              style={[
                styles.typeText,
                documentType === type && styles.typeTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Valid until 2028"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.info}>
        📎 Note: File upload will be available in the next update. For now, you can track document details.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddDocument}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Document</Text>
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
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  typeButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize',
  },
  typeTextActive: {
    color: '#fff',
  },
  info: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
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

export default AddDocumentScreen;