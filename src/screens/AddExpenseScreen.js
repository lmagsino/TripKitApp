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
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExpenseScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PHP');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  useEffect(() => {
    // Initialize with today's date
    setExpenseDate(new Date());
    // Fetch trip members
    fetchMembers();
  }, []);

  const categories = ['taxi', 'food', 'hotel', 'activities', 'shopping', 'other'];

  const formatDate = (date) => {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  };

  const fetchMembers = async () => {
    try {
      const response = await api.get(`/trips/${tripId}`);
      const tripMembers = response.data.users || [];
      setMembers(tripMembers);
      // Select all by default
      setSelectedUsers(tripMembers.map(u => u.id));
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpenseDate(selectedDate);
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Please fill in amount and category');
      return;
    }

    if (selectedUsers.length === 0) {
      Alert.alert('Error', 'Please select at least one person to split with');
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
          expense_date: formatDate(expenseDate),
        },
        split_user_ids: selectedUsers,
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

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
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
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(expenseDate)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={expenseDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

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

      <Text style={styles.label}>Split Among</Text>
      <View style={styles.memberContainer}>
        {members.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={[
              styles.memberButton,
              selectedUsers.includes(member.id) && styles.memberButtonActive
            ]}
            onPress={() => toggleUser(member.id)}
          >
            <Text
              style={[
                styles.memberText,
                selectedUsers.includes(member.id) && styles.memberTextActive
              ]}
            >
              {selectedUsers.includes(member.id) ? '☑️' : '☐'} {member.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {amount && selectedUsers.length > 0 && splitType === 'equal' && (
        <View style={styles.splitInfo}>
          <Text style={styles.splitInfoText}>
            {currency} {(parseFloat(amount) / selectedUsers.length).toFixed(2)} each ({selectedUsers.length} {selectedUsers.length === 1 ? 'person' : 'people'})
          </Text>
        </View>
      )}

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
  memberContainer: {
    gap: 10,
  },
  memberButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  memberButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#e3f2fd',
  },
  memberText: {
    fontSize: 16,
    color: '#666',
  },
  memberTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  splitInfo: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    alignItems: 'center',
  },
  splitInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default AddExpenseScreen;