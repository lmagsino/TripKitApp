import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Clipboard,
} from 'react-native';
import api from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const TripDashboardScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [expenseCount, setExpenseCount] = useState(0);

  const fetchTrip = async () => {
    try {
      const response = await api.get(`/trips/${tripId}`);
      setTrip(response.data);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettlement = async () => {
    try {
      const response = await api.get(`/trips/${tripId}/settlement`);
      
      // Calculate user's balance
      let userBalance = 0;
      response.data.settlements.forEach(settlement => {
        if (settlement.to_user.id === response.data.current_user_id) {
          userBalance += parseFloat(settlement.amount);
        }
        if (settlement.from_user.id === response.data.current_user_id) {
          userBalance -= parseFloat(settlement.amount);
        }
      });
      
      setBalance({ amount: userBalance, currency: response.data.currency });
    } catch (error) {
      console.error('Error fetching settlement:', error);
    }
  };

  const fetchExpenseCount = async () => {
    try {
      const response = await api.get(`/trips/${tripId}/expenses`);
      setExpenseCount(response.data.length);
    } catch (error) {
      console.error('Error fetching expense count:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTrip();
      fetchSettlement();
      fetchExpenseCount();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text>Trip not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tripName}>{trip.name}</Text>
        <Text style={styles.dates}>
          {trip.start_date} - {trip.end_date}
        </Text>
        <Text style={styles.currency}>{trip.active_currency}</Text>
      </View>

      {balance && (
        <View style={[styles.balanceCard, balance.amount >= 0 ? styles.balancePositive : styles.balanceNegative]}>
          <Text style={styles.balanceLabel}>
            {balance.amount >= 0 ? "You're owed" : "You owe"}
          </Text>
          <Text style={styles.balanceAmount}>
            {balance.currency} {Math.abs(balance.amount).toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Invite Code</Text>
        <Text style={styles.inviteCode}>{trip.invite_code}</Text>
        <TouchableOpacity 
          style={styles.copyButton}
          onPress={() => {
            Clipboard.setString(trip.invite_code);
            Alert.alert('Copied!', 'Invite code copied to clipboard');
          }}
        >
          <Text style={styles.copyButtonText}>📋 Copy Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('ExpenseList', { tripId: trip.id })}
        >
          <Text style={styles.menuIcon}>💰</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Expenses</Text>
            {expenseCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{expenseCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('ItineraryList', { tripId: trip.id })}
        >
          <Text style={styles.menuIcon}>📅</Text>
          <Text style={styles.menuText}>Itinerary</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('DocumentList', { tripId: trip.id })}
        >
          <Text style={styles.menuIcon}>📎</Text>
          <Text style={styles.menuText}>Documents</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settlement', { tripId: trip.id })}
        >
          <Text style={styles.menuIcon}>💸</Text>
          <Text style={styles.menuText}>Settlement</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  tripName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  dates: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  currency: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inviteCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 4,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  balanceCard: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  balancePositive: {
    backgroundColor: '#d4edda',
  },
  balanceNegative: {
    backgroundColor: '#f8d7da',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  copyButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TripDashboardScreen;