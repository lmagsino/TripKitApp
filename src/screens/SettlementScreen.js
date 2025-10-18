import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import api from '../services/api';

const SettlementScreen = ({ route }) => {
  const { tripId } = route.params;
  const [settlement, setSettlement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettlement();
  }, []);

  const fetchSettlement = async () => {
    try {
      const response = await api.get(`/trips/${tripId}/settlement`);
      setSettlement(response.data);
    } catch (error) {
      console.error('Error fetching settlement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const hasSettlements = settlement?.settlements && settlement.settlements.length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settlement Summary</Text>
        <Text style={styles.currency}>{settlement?.currency}</Text>
      </View>

      {!hasSettlements ? (
        <View style={styles.emptyState}>
          <Text style={styles.celebrationIcon}>🎉</Text>
          <Text style={styles.emptyText}>All Settled Up!</Text>
          <Text style={styles.emptySubtext}>No outstanding debts</Text>
          <Text style={styles.celebrationText}>Everyone's even! 🤝</Text>
        </View>
      ) : (
        <View style={styles.settlementsContainer}>
          {settlement.settlements.map((item, index) => (
            <View key={index} style={styles.settlementCard}>
              <View style={styles.settlementRow}>
                <View style={styles.userBadge}>
                  <Text style={styles.userInitial}>
                    {item.from_user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.settlementInfo}>
                  <Text style={styles.fromUser}>{item.from_user.name}</Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.toUser}>{item.to_user.name}</Text>
                </View>
              </View>
              <Text style={styles.amount}>
                {item.currency} {item.amount}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  currency: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
  },
  settlementsContainer: {
    padding: 15,
  },
  settlementCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settlementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  settlementInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#999',
    marginHorizontal: 8,
  },
  toUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  celebrationIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  celebrationText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 10,
  },
});

export default SettlementScreen;