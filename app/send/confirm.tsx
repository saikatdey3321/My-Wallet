import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ConfirmSendScreen = () => {
  const [amount, setAmount] = useState('');

  // Hard‑coded recipient details for now
  const name = 'John Doe';
  const number = '9876543210';

  const handleConfirm = () => {
    alert(`₹${amount} sent to ${name} (${number})`);
    // router.replace('/send/success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Confirm Transfer</Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="person-circle-outline" size={48} color="#4682B4" />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>{number}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.currency}>₹</Text>
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, !amount && { opacity: 0.6 }]}
        disabled={!amount}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmText}>Send ₹{amount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmSendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  header: {
    backgroundColor: '#4682B4',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  number: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: '#333',
  },
  currency: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#4682B4',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
