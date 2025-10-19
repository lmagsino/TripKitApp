import React, { useState, useEffect } from 'react';
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

const AddExpenseScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PHP');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [expenseDate, setExpenseDate] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setExpenseDate(today);
  }, []);

  const categories = ['taxi', 'food', 'hotel', 'activities', 'shopping', 'other'];

  const handleAddExpense = async () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Please fill in amount and category');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/trips/${tripId}/expenses`, {
        expense: {
          amount: parseFloat(amount),
          currency,
          category,
          description,
          split_type: splitType,
          expense_date: expenseDate,
        },
      });

      Alert.alert('Success', 'Expense added!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Amount *</Text>
      <View style={styles.amountRow}>
        <TextInput
          style={styles.currencyInput}
          value={currency}
          onChangeText={setCurrency}
          placeholder="PHP"
        />
        <TextInput
          style={styles.amountInput}
          placeholder="500"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>

      <Text style={styles.label}>Category *</Text>
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

      <Text style={styles.label}>Description (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Airport to hotel"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={expenseDate}
        onChangeText={setExpenseDate}
      />

      <Text style={styles.label}>Split Type</Text>
      <View style={styles.splitTypeContainer}>
        <TouchableOpacity
          style={[
            styles.splitTypeButton,
            splitType === 'equal' && styles.splitTypeButtonActive,
          ]}
          onPress={() => setSplitType('equal')}
        >
          <Text
            style={[
              styles.splitTypeText,
              splitType === 'equal' && styles.splitTypeTextActive,
            ]}
          >
            Equal Split
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.splitTypeButton,
            splitType === 'custom' && styles.splitTypeButtonActive,
          ]}
          onPress={() => setSplitType('custom')}
        >
          <Text
            style={[
              styles.splitTypeText,
              splitType === 'custom' && styles.splitTypeTextActive,
            ]}
          >
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddExpense}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Expense</Text>
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
    marginBottom: 10,
    marginTop: 20,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 10,
  },
  currencyInput: {
    width: 80,
    height: 60,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  amountInput: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 24,
    fontWeight: 'bold',
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  splitTypeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  splitTypeButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  splitTypeButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  splitTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  splitTypeTextActive: {
    color: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#28a745',
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

export default AddExpenseScreen;