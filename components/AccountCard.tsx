import { StyleSheet, Text, View } from 'react-native';

export default function AccountCard() {
  // Replace with actual account data
  const account = {
    name: 'John Doe',
    balance: 1500,
    accountNumber: '1234567890',
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.balance}>Balance: ₹{account.balance}</Text>
      <Text style={styles.accountNumber}>Account No: {account.accountNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 16,
    marginTop: 8,
  },
  accountNumber: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
