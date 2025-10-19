import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import api from '../services/api';
import { formatDate } from '../utils/dateFormatter';

const ExpenseListScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get(`/trips/${tripId}/expenses`);
      setExpenses(response.data);
      
      // Calculate total
      const sum = response.data.reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
      setTotal(sum);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderExpense = ({ item }) => (
    <TouchableOpacity 
      style={styles.expenseCard}
      onPress={() => navigation.navigate('ExpenseDetail', { tripId, expense: item })}
    >
      <View style={styles.expenseHeader}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.amount}>
          {item.currency} {item.amount}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.paidBy}>
        Paid by {item.paid_by_user?.name || 'Unknown'}
      </Text>
      <Text style={styles.date}>{formatDate(item.expense_date)}</Text>
    </TouchableOpacity>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      taxi: '🚕',
      food: '🍽️',
      hotel: '🏨',
      activities: '🎫',
      shopping: '🛒',
      other: '📦',
    };
    return icons[category] || '💰';
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!loading && expenses.length > 0 && (
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Spent</Text>
          <Text style={styles.totalAmount}>
            {expenses[0]?.currency} {total.toFixed(2)}
          </Text>
        </View>
      )}
      {expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No expenses yet</Text>
          <Text style={styles.emptySubtext}>Add your first expense</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense', { tripId })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 15,
  },
  expenseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  paidBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  totalCard: {
    backgroundColor: '#007AFF',
    margin: 15,
    marginBottom: 0,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 6,
  },
});

export default ExpenseListScreen;