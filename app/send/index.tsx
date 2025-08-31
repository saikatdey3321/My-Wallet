import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface User {
  id: string;
  name: string;
  number: string;
}

const users = [
  { id: '1', name: 'John Doe', number: '9876543210' },
  { id: '2', name: 'Jane Smith', number: '9123456789' },
];

const SendScreen = () => {
 const handleSend = (user: User) => {
  router.push('./send/confirm');
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Send Money</Text>
        <Text style={styles.subtitle}>Choose a contact</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userCard} onPress={() => handleSend(item)}>
              <Ionicons name="person-circle-outline" size={32} color="#4682B4" />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  header: {
    backgroundColor: '#4682B4',
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userInfo: {
    flex: 1,
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
    marginTop: 2,
  },
});

export default SendScreen;
