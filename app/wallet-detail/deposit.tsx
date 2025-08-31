import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    // Implement deposit logic here
    alert(`Deposited ₹${amount}`);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Amount to Deposit:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="e.g., 1000"
      />
      <Button title="Deposit" onPress={handleDeposit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});
