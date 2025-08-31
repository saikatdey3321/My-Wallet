import { View, Text, FlatList, StyleSheet } from 'react-native';

const transactions = [
  { id: '1', description: 'Deposit', amount: 1000, date: '2025-06-01' },
  { id: '2', description: 'Withdrawal', amount: -500, date: '2025-06-03' },
  // Add more transactions as needed
];

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  transaction: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});
