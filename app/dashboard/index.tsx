

// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface updated to match real card structure
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface for recent activity
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data with gradient colors & text colors
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   return (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={20}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   // Filter cards by bank name, cardHolder or cardNumber
//   const filteredCards = cards.filter(
//     (card) =>
//       card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.cardNumber.includes(searchQuery)
//   );

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>My Wallet</Text>
//           <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//             <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.balance}>₹12,540.00</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Cards..."
//           placeholderTextColor="#888"
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => showPopup(item)}
//             >
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles (merged and adapted)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerIcon: {},
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   searchInput: {
//     height: 35,
//     marginTop: 15,
//     marginBottom: 10,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     backgroundColor: '#EFEFEF',
//     fontSize: 14,
//     color: '#333',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     marginHorizontal: 20,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   transactionIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   transactionCard: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   transactionDate: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 4,
//   },
//   transactionAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DashBoardScreen;







// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface updated to match real card structure
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface for recent activity
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data with gradient colors & text colors
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with one additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         // Swipe up
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         // Swipe down
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//       } else {
//         // Reset position
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   // Filter cards by bank name, cardHolder or cardNumber
//   const filteredCards = cards.filter(
//     (card) =>
//       card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.cardNumber.includes(searchQuery)
//   );

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>My Wallet</Text>
//           <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//             <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.balance}>₹12,540.00</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Cards..."
//           placeholderTextColor="#888"
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => showPopup(item)}
//             >
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles (merged and adapted)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerIcon: {},
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   searchInput: {
//     height: 35,
//     marginTop: 15,
//     marginBottom: 10,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     backgroundColor: '#EFEFEF',
//     fontSize: 14,
//     color: '#333',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default DashBoardScreen;




// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('/cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('/profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('/history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('/settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;

//   // Filter cards by bank name, cardHolder or cardNumber
//   const filteredCards = cards.filter(
//     (card) =>
//       card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       card.cardNumber.includes(searchQuery)
//   );

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={openMenu}>
//             <Ionicons name="menu-outline" size={28} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>My Wallet</Text>
//           <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//             <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.balance}>₹12,540.00</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Cards..."
//           placeholderTextColor="#888"
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//         </Animated.View>
//       </TouchableOpacity>
//     </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                 >
//                   <Ionicons name={item.icon} size={20} color="#1F2937" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerIcon: {},
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   searchInput: {
//     height: 35,
//     marginTop: 15,
//     marginBottom: 10,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     backgroundColor: '#EFEFEF',
//     fontSize: 14,
//     color: '#333',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;






// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={openMenu}>
//             <Ionicons name="menu-outline" size={28} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//               <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//             </TouchableOpacity>
//             <View style={{transform: "translateY(70px)"}}>
//               <Text style={styles.title}>My Wallet</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.balanceContainer}>
//           <Text style={styles.balance}>₹12,540.00</Text>
//           <Text style={styles.walletName}>Anantdv Wallet</Text>
//         </View>
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//   <Ionicons name="close-outline" size={28} color="#333" />
// </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                 >
//                   <Ionicons name={item.icon} size={20} color="#1F2937" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerRight: {
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   title: {
//     color: '#fff',
//   fontSize: 20,
//   fontWeight: 'bold',
//   marginBottom: 0,
//   alignSelf: 'flex-end',
//   },
//   headerIcon: {
//     marginBottom: 5,
//   },
//   balanceContainer: {
//     marginTop: 20,
//     alignItems: 'flex-start',
//   },
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   walletName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 8,
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Customer Info Section */}
//       <View style={styles.customerContainer}>
//         <Ionicons name="person-circle-outline" size={40} color="#4682B4" />
//         <View style={styles.customerDetails}>
//           <Text style={styles.customerName}>Saikat Dey</Text>
//           <Text style={styles.customerPhone}>+91 98765 43210</Text>
//         </View>
//       </View>

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={openMenu}>
//             <Ionicons name="menu-outline" size={28} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//               <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//             </TouchableOpacity>
//             <View style={{transform: "translateY(70px)"}}>
//               <Text style={styles.title}>My Wallet</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.balanceContainer}>
//           <Text style={styles.balance}>₹12,540.00</Text>
//           <Text style={styles.walletName}>Anantdv Wallet</Text>
//         </View>
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                 >
//                   <Ionicons name={item.icon} size={20} color="#1F2937" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#F8FAFC',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   customerDetails: {
//     marginLeft: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerRight: {
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 0,
//     alignSelf: 'flex-end',
//   },
//   headerIcon: {
//     marginBottom: 5,
//   },
//   balanceContainer: {
//     marginTop: 20,
//     alignItems: 'flex-start',
//   },
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   walletName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 8,
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Customer Info Section */}
//       <TouchableOpacity onPress={openMenu} style={styles.customerContainer}>
//         <Ionicons name="person-circle-outline" size={40} color="#4682B4" />
//         <View style={styles.customerDetails}>
//           <Text style={styles.customerName}>Saikat Dey</Text>
//           <Text style={styles.customerPhone}>+91 98765 43210</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//               <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//             </TouchableOpacity>
//             <View style={{transform: "translateY(70px)"}}>
//            <Text style={styles.title}>My Wallet</Text>
//            </View>
            
//           </View>
//         </View>

//         <View style={styles.balanceContainer}>
//           <Text style={styles.balance}>₹12,540.00</Text>
//           <Text style={styles.walletName}>Anantdv Wallet</Text>
//         </View>
//       </View>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                 >
//                   <Ionicons name={item.icon} size={20} color="#1F2937" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#F8FAFC',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   customerDetails: {
//     marginLeft: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   header: {
//     backgroundColor: '#4682B4',
//     padding: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end', // Changed to align wallet icon and title to the right
//   },
//   headerRight: {
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 0,
//     alignSelf: 'flex-end',
//   },
//   headerIcon: {
//     marginBottom: 5,
//   },
//   balanceContainer: {
//     marginTop: 20,
//     alignItems: 'flex-start',
//   },
//   balance: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   walletName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 8,
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Customer Info Section */}
//       <TouchableOpacity onPress={openMenu} style={styles.customerContainer}>
//         <Ionicons name="person-circle-outline" size={40} color="#4682B4" />
//         <View style={styles.customerDetails}>
//           <Text style={styles.customerName}>Saikat Dey</Text>
//           <Text style={styles.customerPhone}>+91 98765 43210</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View style={styles.headerInner}>
//           <View style={styles.headerRow}>
//             <View style={styles.headerRight}>
//               <TouchableOpacity onPress={() => router.push('./wallet-detail')}>
//                 <Ionicons name="wallet" size={23} color="#fff" style={styles.headerIcon} />
//               </TouchableOpacity>
//              <View style={{transform: "translateY(50px)"}}>
//               <Text style={styles.title}>My Wallet</Text>
//              </View>
//             </View>
//           </View>
//           <View style={styles.balanceContainer}>
//             <Text style={styles.walletName}>Anantdv Wallet</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           activeOpacity={1}
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                 >
//                   <Ionicons name={item.icon} size={20} color="#1F2937" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#F8FAFC',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   customerDetails: {
//     marginLeft: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   header: {
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginTop: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle inner overlay for depth
//     borderRadius: 30,
//     padding: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   headerRight: {
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   headerIcon: {
//     marginBottom: 5,
//   },
//   balanceContainer: {
//     marginTop: 10,
//     alignItems: 'flex-start',
//   },
//   walletName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;




// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0)']}
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={openMenu}
//               style={styles.customerContainer}
//               accessibilityLabel="Open menu"
//               accessibilityRole="button"
//             >
//               <Ionicons name="person-circle-outline" size={36} color="#fff" />
//               <View style={styles.customerDetails}>
//                 <Text style={styles.customerName}>Saikat Dey</Text>
//                 <Text style={styles.customerPhone}>+91 98765 43210</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.walletContainer}>
//               <TouchableOpacity
//                 onPress={() => router.push('./wallet-detail')}
//                 style={styles.walletIconContainer}
//                 accessibilityLabel="Open wallet details"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="wallet" size={22} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.title}>My Wallet</Text>
//               <Text style={styles.walletName}>Anantdv Wallet</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           accessibilityLabel="Close modal"
//           accessibilityRole="button"
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           accessibilityLabel="Close menu"
//           accessibilityRole="button"
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                   accessibilityLabel={`Open ${item.name}`}
//                   accessibilityRole="button"
//                 >
//                   <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     marginTop: 40,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 20,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   customerDetails: {
//     marginLeft: 8,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#E0E0E0',
//     marginTop: 2,
//   },
//   walletContainer: {
//     alignItems: 'flex-end',
//   },
//   walletIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     marginBottom: 4,
//   },
//   walletName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#E0E0E0',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   menuOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;





// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   PanResponder,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component with swipe-up and swipe-down
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       translateY.setValue(gestureState.dy);
//     },
//     onPanResponderRelease: (_, gestureState) => {
//       if (gestureState.dy < -50) {
//         console.log(`Swiped up on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else if (gestureState.dy > 50) {
//         console.log(`Swiped down on transaction: ${transaction.description}`);
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       } else {
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//           friction: 7,
//           tension: 40,
//         }).start();
//       }
//     },
//   });

//   return (
//     <Animated.View
//       style={[styles.transactionItem, { transform: [{ translateY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </Animated.View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0)']}
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={openMenu}
//               style={styles.customerContainer}
//               accessibilityLabel="Open menu"
//               accessibilityRole="button"
//             >
//               <Ionicons name="person-circle-outline" size={36} color="#fff" />
//               <View style={styles.customerDetails}>
//                 <Text style={styles.customerName}>Saikat Dey</Text>
//                 <Text style={styles.customerPhone}>+91 98765 43210</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.walletContainer}>
//               <TouchableOpacity
//                 onPress={() => router.push('./wallet-detail')}
//                 style={styles.walletIconContainer}
//                 accessibilityLabel="Open wallet details"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="wallet" size={22} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.title}>My Wallet</Text>
//               <Text style={styles.walletName}>Anantdv Wallet</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity 
//           onPress={() => router.push('./send')} 
//            style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}>
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           accessibilityLabel="Close modal"
//           accessibilityRole="button"
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           accessibilityLabel="Close menu"
//           accessibilityRole="button"
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                   accessibilityLabel={`Open ${item.name}`}
//                   accessibilityRole="button"
//                 >
//                   <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     marginTop: 0.5,
//     borderTopLeftRadius: 20, // Added for top corner rounding
//     borderTopRightRadius: 20, // Added for top corner rounding
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20, // Match header's top corner rounding
//     borderTopRightRadius: 20, // Match header's top corner rounding
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopLeftRadius: 20, // Match header's top corner rounding
//     borderTopRightRadius: 20, // Match header's top corner rounding
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   customerDetails: {
//     marginLeft: 8,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#E0E0E0',
//     marginTop: 2,
//   },
//   walletContainer: {
//     alignItems: 'flex-end',
//   },
//   walletIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     marginBottom: 4,
//   },
//   walletName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#E0E0E0',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component without swipe functionality
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);

//   return (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0)']}
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={openMenu}
//               style={styles.customerContainer}
//               accessibilityLabel="Open menu"
//               accessibilityRole="button"
//             >
//               <Ionicons name="person-circle-outline" size={36} color="#fff" />
//               <View style={styles.customerDetails}>
//                 <Text style={styles.customerName}>Saikat Dey</Text>
//                 <Text style={styles.customerPhone}>+91 98765 43210</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.walletContainer}>
//               <TouchableOpacity
//                 onPress={() => router.push('./wallet-detail')}
//                 style={styles.walletIconContainer}
//                 accessibilityLabel="Open wallet details"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="wallet" size={22} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.title}>My Wallet</Text>
//               <Text style={styles.walletName}>Anantdv Wallet</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity 
//             onPress={() => router.push('./send')} 
//             style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}
//           >
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           accessibilityLabel="Close modal"
//           accessibilityRole="button"
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.menuOverlay}
//           onPress={closeMenu}
//           accessibilityLabel="Close menu"
//           accessibilityRole="button"
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                   accessibilityLabel={`Open ${item.name}`}
//                   accessibilityRole="button"
//                 >
//                   <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     marginTop: 0.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   customerDetails: {
//     marginLeft: 8,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   customerPhone: {
//     fontSize: 14,
//     color: '#E0E0E0',
//     marginTop: 2,
//   },
//   walletContainer: {
//     alignItems: 'flex-end',
//   },
//   walletIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     marginBottom: 4,
//   },
//   walletName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#E0E0E0',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component without swipe functionality
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);

//   return (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#2B547E']} // Updated colors to match notification bar
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']} // Subtle sheen adjustment
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={openMenu}
//               style={styles.customerContainer}
//               accessibilityLabel="Open menu"
//               accessibilityRole="button"
//             >
//               <Ionicons name="person-circle-outline" size={36} color="#fff" />
//               <View style={styles.customerDetails}>
//                 <Text style={styles.customerName}>Saikat Dey</Text>
//                 <Text style={styles.customerPhone}>+91 98765 43210</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.walletContainer}>
//               <TouchableOpacity
//                 onPress={() => router.push('./wallet-detail')}
//                 style={styles.walletIconContainer}
//                 accessibilityLabel="Open wallet details"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="wallet" size={22} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.title}>My Wallet</Text>
//               <Text style={styles.walletName}>Anantdv Wallet</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity 
//             onPress={() => router.push('./send')} 
//             style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}
//           >
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           accessibilityLabel="Close modal"
//           accessibilityRole="button"
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={closeMenu}
//           accessibilityLabel="Close menu"
//           accessibilityRole="button"
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                   accessibilityLabel={`Open ${item.name}`}
//                   accessibilityRole="button"
//                 >
//                   <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     marginTop: 0.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   customerDetails: {
//     marginLeft: 8,
//   },
//   customerName: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold', // Professional serif font
//     fontWeight: '700',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   customerPhone: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular', // Clean sans-serif for secondary text
//     color: '#E0E0E0',
//     marginTop: 2,
//   },
//   walletContainer: {
//     alignItems: 'flex-end',
//   },
//   walletIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: 'RobotoSlab-Bold', // Consistent serif for headings
//     fontWeight: '900',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     marginBottom: 4,
//   },
//   walletName: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular', // Matching sans-serif for clarity
//     fontWeight: '600',
//     color: '#E0E0E0',
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontFamily: 'Roboto-Medium', // Professional sans-serif for buttons
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold', // Serif for section headings
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     fontFamily: 'RobotoMono-Regular', // Monospace for card numbers
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Regular',
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//     fontFamily: 'Roboto-Regular',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     fontFamily: 'RobotoMono-Regular',
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Regular',
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     fontFamily: 'Roboto-Regular',
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;




// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Card interface
// interface Card {
//   id: string;
//   bank: string;
//   cardNumber: string;
//   expiry: string;
//   holder: string;
//   balance: string;
//   bgFrom: string;
//   bgTo: string;
//   text: string;
// }

// // Transaction interface
// interface Transaction {
//   id: string;
//   type: 'send' | 'request' | 'recharge' | 'payment';
//   amount: string;
//   date: string;
//   cardId: string;
//   description: string;
// }

// // Real bank cards data
// const cards: Card[] = [
//   {
//     id: '1',
//     bank: 'Axis Bank',
//     cardNumber: '**** **** **** 1234',
//     expiry: '12/26',
//     holder: 'Saikat Dey',
//     balance: '₹10,000',
//     bgFrom: '#AE275F',
//     bgTo: '#EB1165',
//     text: '#fff',
//   },
//   {
//     id: '2',
//     bank: 'SBI Bank',
//     cardNumber: '**** **** **** 4567',
//     expiry: '11/24',
//     holder: 'Saikat Dey',
//     balance: '₹25,500',
//     bgFrom: '#00B5EF',
//     bgTo: '#292075',
//     text: '#fff',
//   },
//   {
//     id: '3',
//     bank: 'PNB Bank',
//     cardNumber: '**** **** **** 7890',
//     expiry: '08/25',
//     holder: 'Saikat Dey',
//     balance: '₹5,200',
//     bgFrom: '#FBBC09',
//     bgTo: '#A20E37',
//     text: '#000',
//   },
//   {
//     id: '4',
//     bank: 'HDFC Bank',
//     cardNumber: '**** **** **** 2345',
//     expiry: '03/28',
//     holder: 'Saikat Dey',
//     balance: '₹15,300',
//     bgFrom: '#00416A',
//     bgTo: '#00629B',
//     text: '#fff',
//   },
// ];

// // Sample transaction data with additional activity
// const transactions: Transaction[] = [
//   {
//     id: 't1',
//     type: 'send',
//     amount: '-₹2,000',
//     date: '2025-06-08',
//     cardId: '1',
//     description: 'Sent to John Doe',
//   },
//   {
//     id: 't2',
//     type: 'request',
//     amount: '+₹1,500',
//     date: '2025-06-07',
//     cardId: '2',
//     description: 'Received from Jane Smith',
//   },
//   {
//     id: 't3',
//     type: 'recharge',
//     amount: '-₹500',
//     date: '2025-06-06',
//     cardId: '3',
//     description: 'Mobile Recharge',
//   },
//   {
//     id: 't4',
//     type: 'payment',
//     amount: '-₹3,200',
//     date: '2025-06-05',
//     cardId: '4',
//     description: 'Online Shopping',
//   },
//   {
//     id: 't5',
//     type: 'payment',
//     amount: '-₹1,000',
//     date: '2025-06-04',
//     cardId: '1',
//     description: 'Electricity Bill',
//   },
// ];

// // Icon mapping for Ionicons
// const iconMapping: { [key in Transaction['type']]: string } = {
//   send: 'send',
//   request: 'arrow-down',
//   recharge: 'phone-portrait-outline',
//   payment: 'card-outline',
// };

// // Menu options
// const menuOptions = [
//   { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
//   { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
//   { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
//   { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
//   { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
// ];

// // Card component with gradient background
// const BankCard = ({ card }: { card: Card }) => (
//   <LinearGradient
//     colors={[card.bgFrom, card.bgTo]}
//     style={styles.card}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//   >
//     <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
//     <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
//     <View style={styles.row}>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
//       </View>
//       <View>
//         <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
//         <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
//       </View>
//     </View>
//     <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
//   </LinearGradient>
// );

// // Transaction component without swipe functionality
// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const card = cards.find((c) => c.id === transaction.cardId);

//   return (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionIcon}>
//         <Ionicons
//           name={iconMapping[transaction.type]}
//           size={16}
//           color="#333"
//         />
//       </View>
//       <View style={styles.transactionDetails}>
//         <Text style={styles.transactionDescription}>{transaction.description}</Text>
//         <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
//         <Text style={styles.transactionDate}>{transaction.date}</Text>
//       </View>
//       <Text
//         style={[
//           styles.transactionAmount,
//           { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
//         ]}
//       >
//         {transaction.amount}
//       </Text>
//     </View>
//   );
// };

// const DashBoardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;

//   const filteredCards = cards;

//   const showPopup = (card: Card) => {
//     setSelectedCard(card);
//     setModalVisible(true);
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closePopup = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.5,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedCard(null);
//     });
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(menuAnim, {
//       toValue: 0,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: -width * 0.6,
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setMenuVisible(false));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#2B547E']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']}
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={openMenu}
//               style={styles.customerContainer}
//               accessibilityLabel="Open menu"
//               accessibilityRole="button"
//             >
//               <Ionicons name="person-circle-outline" size={36} color="#fff" />
//               <View style={styles.customerDetails}>
//                 <Text style={styles.customerName}>Saikat Dey</Text>
//                 <Text style={styles.customerPhone}>+91 98765 43210</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.walletContainer}>
//               <TouchableOpacity
//                 onPress={() => router.push('./wallet-detail')}
//                 style={styles.walletIconContainer}
//                 accessibilityLabel="Open wallet details"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="wallet" size={22} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.title}>My Wallet</Text>
//               <Text style={styles.walletName}>Anantdv Wallet</Text>
//               <Text style={styles.totalBalance}>Wallet Balance: ₹56,000</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Services Section */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.serviceRow}>
//           <TouchableOpacity 
//             onPress={() => router.push('./send')} 
//             style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}
//           >
//             <Ionicons name="send" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Send</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
//             <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Request</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Recharge</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
//             <Ionicons name="card-outline" size={20} color="#1C1C1C" />
//             <Text style={styles.serviceText}>Payment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Smart Cards Section */}
//       <View style={styles.cardsContainer}>
//         <Text style={styles.sectionTitle}>My Credit Cards</Text>
//         <FlatList
//           data={filteredCards}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
//               <BankCard card={item} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
//         />
//       </View>

//       {/* Recent Activity Section */}
//       <View style={styles.recentActivityContainer}>
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           renderItem={({ item }) => <TransactionItem transaction={item} />}
//           ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
//         />
//       </View>

//       {/* Popup Modal */}
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={closePopup}
//           accessibilityLabel="Close modal"
//           accessibilityRole="button"
//         >
//           <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
//             {selectedCard && (
//               <>
//                 <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
//                 <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
//                 <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
//                 <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
//                 <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
//               </>
//             )}
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Side Menu */}
//       <Modal transparent visible={menuVisible} animationType="none">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={closeMenu}
//           accessibilityLabel="Close menu"
//           accessibilityRole="button"
//         >
//           <Animated.View
//             style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
//           >
//             <View style={styles.menuHeader}>
//               <Text style={styles.menuTitle}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
//                 <Ionicons name="close-outline" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={menuOptions}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     item.action();
//                     closeMenu();
//                   }}
//                   accessibilityLabel={`Open ${item.name}`}
//                   accessibilityRole="button"
//                 >
//                   <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
//                   <Text style={styles.menuItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </Animated.View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     marginTop: 0.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   customerDetails: {
//     marginLeft: 8,
//   },
//   customerName: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: '700',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   customerPhone: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular',
//     color: '#E0E0E0',
//     marginTop: 2,
//   },
//   walletContainer: {
//     alignItems: 'flex-end',
//   },
//   walletIconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: '900',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     marginBottom: 4,
//   },
//   walletName: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     fontWeight: '600',
//     color: '#E0E0E0',
//   },
//   totalBalance: {
//     fontSize: 14,
//     fontFamily: 'RobotoMono-Medium', // Monospace for numerical data
//     fontWeight: 'bold',
//     color: '#FFFFFF', // Gold color for emphasis
//     marginTop: 4,
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
    
//   },
//   servicesContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   serviceBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   serviceText: {
//     color: '#2C3E50',
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '600',
//     fontSize: 11,
//     textAlign: 'center',
//     maxWidth: 60,
//     lineHeight: 14,
//     marginTop: 4,
//   },
//   cardsContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     marginHorizontal: 20,
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     width: width - 80,
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   bank: {
//     fontSize: 20,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   number: {
//     fontSize: 18,
//     fontFamily: 'RobotoMono-Regular',
//     letterSpacing: 2,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Regular',
//     opacity: 0.8,
//   },
//   value: {
//     fontSize: 16,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//     fontFamily: 'Roboto-Regular',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popupBox: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 22,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   popupCardNumber: {
//     fontSize: 20,
//     fontFamily: 'RobotoMono-Regular',
//     color: '#333',
//     marginBottom: 6,
//   },
//   popupHolder: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupExpiry: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#555',
//     marginBottom: 6,
//   },
//   popupBalance: {
//     fontSize: 18,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   recentActivityContainer: {
//     marginTop: 20,
//     flex: 1,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 8,
//     marginHorizontal: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//   },
//   transactionIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E2E8F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   transactionCard: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Regular',
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   transactionDate: {
//     fontSize: 10,
//     fontFamily: 'Roboto-Regular',
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   menuContainer: {
//     width: width * 0.6,
//     height: '100%',
//     backgroundColor: '#F8FAFC',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   menuHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontFamily: 'RobotoSlab-Bold',
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   menuItemText: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: '#1F2937',
//     marginLeft: 10,
//   },
//   menuIcon: {
//     marginRight: 10,
//   },
// });

// export default DashBoardScreen;



import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Card interface
interface Card {
  id: string;
  bank: string;
  cardNumber: string;
  expiry: string;
  holder: string;
  balance: string;
  bgFrom: string;
  bgTo: string;
  text: string;
}

// Transaction interface
interface Transaction {
  id: string;
  type: 'send' | 'request' | 'recharge' | 'payment';
  amount: string;
  date: string;
  cardId: string;
  description: string;
}

// Real bank cards data
const cards: Card[] = [
  {
    id: '1',
    bank: 'Axis Bank',
    cardNumber: '**** **** **** 1234',
    expiry: '12/26',
    holder: 'Saikat Dey',
    balance: '₹10,000',
    bgFrom: '#AE275F',
    bgTo: '#EB1165',
    text: '#fff',
  },
  {
    id: '2',
    bank: 'SBI Bank',
    cardNumber: '**** **** **** 4567',
    expiry: '11/24',
    holder: 'Saikat Dey',
    balance: '₹25,500',
    bgFrom: '#00B5EF',
    bgTo: '#292075',
    text: '#fff',
  },
  {
    id: '3',
    bank: 'PNB Bank',
    cardNumber: '**** **** **** 7890',
    expiry: '08/25',
    holder: 'Saikat Dey',
    balance: '₹5,200',
    bgFrom: '#FBBC09',
    bgTo: '#A20E37',
    text: '#000',
  },
  {
    id: '4',
    bank: 'HDFC Bank',
    cardNumber: '**** **** **** 2345',
    expiry: '03/28',
    holder: 'Saikat Dey',
    balance: '₹15,300',
    bgFrom: '#00416A',
    bgTo: '#00629B',
    text: '#fff',
  },
];

// Sample transaction data with additional activity
const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'send',
    amount: '-₹2,000',
    date: '2025-06-08',
    cardId: '1',
    description: 'Sent to John Doe',
  },
  {
    id: 't2',
    type: 'request',
    amount: '+₹1,500',
    date: '2025-06-07',
    cardId: '2',
    description: 'Received from Jane Smith',
  },
  {
    id: 't3',
    type: 'recharge',
    amount: '-₹500',
    date: '2025-06-06',
    cardId: '3',
    description: 'Mobile Recharge',
  },
  {
    id: 't4',
    type: 'payment',
    amount: '-₹3,200',
    date: '2025-06-05',
    cardId: '4',
    description: 'Online Shopping',
  },
  {
    id: 't5',
    type: 'payment',
    amount: '-₹1,000',
    date: '2025-06-04',
    cardId: '1',
    description: 'Electricity Bill',
  },
];

// Icon mapping for Ionicons
const iconMapping: { [key in Transaction['type']]: string } = {
  send: 'send',
  request: 'arrow-down',
  recharge: 'phone-portrait-outline',
  payment: 'card-outline',
};

// Menu options
const menuOptions = [
  { id: '1', name: 'My Cart', icon: 'cart-outline', action: () => router.push('./cart') },
  { id: '2', name: 'Profile', icon: 'person-outline', action: () => router.push('./profile') },
  { id: '3', name: 'Transaction History', icon: 'time-outline', action: () => router.push('./history') },
  { id: '4', name: 'Settings', icon: 'settings-outline', action: () => router.push('./settings') },
  { id: '5', name: 'Log Out', icon: 'log-out-outline', action: () => console.log('Log Out') },
];

// Card component with gradient background
const BankCard = ({ card }: { card: Card }) => (
  <LinearGradient
    colors={[card.bgFrom, card.bgTo]}
    style={styles.card}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <Text style={[styles.bank, { color: card.text }]}>{card.bank}</Text>
    <Text style={[styles.number, { color: card.text }]}>{card.cardNumber}</Text>
    <View style={styles.row}>
      <View>
        <Text style={[styles.label, { color: card.text }]}>Card Holder</Text>
        <Text style={[styles.value, { color: card.text }]}>{card.holder}</Text>
      </View>
      <View>
        <Text style={[styles.label, { color: card.text }]}>Expiry</Text>
        <Text style={[styles.value, { color: card.text }]}>{card.expiry}</Text>
      </View>
    </View>
    <Text style={[styles.balance, { color: card.text }]}>Balance: {card.balance}</Text>
  </LinearGradient>
);

// Transaction component without swipe functionality
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const card = cards.find((c) => c.id === transaction.cardId);

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={iconMapping[transaction.type]}
          size={16}
          color="#333"
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionCard}>{card ? card.bank : 'Unknown Card'}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: transaction.amount.startsWith('+') ? '#2e7d32' : '#d32f2f' },
        ]}
      >
        {transaction.amount}
      </Text>
    </View>
  );
};

const DashBoardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const menuAnim = useRef(new Animated.Value(-width * 0.6)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const filteredCards = cards;

  const showPopup = (card: Card) => {
    setSelectedCard(card);
    setModalVisible(true);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedCard(null);
    });
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuAnim, {
      toValue: -width * 0.6,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#4682B4', '#2B547E']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']}
          style={styles.headerSheen}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.headerInner}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={openMenu}
              style={styles.customerContainer}
              accessibilityLabel="Open menu"
              accessibilityRole="button"
            >
              <Ionicons name="person-circle-outline" size={36} color="#fff" />
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Saikat Dey</Text>
                <Text style={styles.customerPhone}>+91 98765 43210</Text>
                <Text style={styles.totalBalance}>Wallet Balance: ₹56,000</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.walletContainer}>
              <TouchableOpacity
                onPress={() => router.push('./wallet-detail')}
                style={styles.walletIconContainer}
                accessibilityLabel="Open wallet details"
                accessibilityRole="button"
              >
                <Ionicons name="wallet" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>My Wallet</Text>
              <Text style={styles.walletName}>Anantdv Wallet</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Services Section */}
      <View style={styles.servicesContainer}>
        <View style={styles.serviceRow}>
          <TouchableOpacity 
            onPress={() => router.push('./send')} 
            style={[styles.serviceBtn, { backgroundColor: '#B0E0E6' }]}
          >
            <Ionicons name="send" size={20} color="#1C1C1C" />
            <Text style={styles.serviceText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#FFDAB9' }]}>
            <Ionicons name="arrow-down" size={20} color="#1C1C1C" />
            <Text style={styles.serviceText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#D8BFD8' }]}>
            <Ionicons name="phone-portrait-outline" size={20} color="#1C1C1C" />
            <Text style={styles.serviceText}>Recharge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceBtn, { backgroundColor: '#E6E6FA' }]}>
            <Ionicons name="card-outline" size={20} color="#1C1C1C" />
            <Text style={styles.serviceText}>Payment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Smart Cards Section */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>My Credit Cards</Text>
        <FlatList
          data={filteredCards}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={() => showPopup(item)}>
              <BankCard card={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noResults}>No cards found.</Text>}
        />
      </View>

      {/* Recent Activity Section */}
      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          ListEmptyComponent={<Text style={styles.noResults}>No recent activity.</Text>}
        />
      </View>

      {/* Popup Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closePopup}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        >
          <Animated.View style={[styles.popupBox, { transform: [{ scale: scaleAnim }] }]}>
            {selectedCard && (
              <>
                <Text style={styles.popupTitle}>{selectedCard.bank} Card</Text>
                <Text style={styles.popupCardNumber}>{selectedCard.cardNumber}</Text>
                <Text style={styles.popupHolder}>Card Holder: {selectedCard.holder}</Text>
                <Text style={styles.popupExpiry}>Expiry: {selectedCard.expiry}</Text>
                <Text style={styles.popupBalance}>Balance: {selectedCard.balance}</Text>
              </>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Side Menu */}
      <Modal transparent visible={menuVisible} animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closeMenu}
          accessibilityLabel="Close menu"
          accessibilityRole="button"
        >
          <Animated.View
            style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={closeMenu} accessibilityLabel="Close menu">
                <Ionicons name="close-outline" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={menuOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    item.action();
                    closeMenu();
                  }}
                  accessibilityLabel={`Open ${item.name}`}
                  accessibilityRole="button"
                >
                  <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  header: {
    marginTop: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  headerSheen: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerDetails: {
    marginLeft: 8,
  },
  customerName: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  customerPhone: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#E0E0E0',
    marginTop: 2,
  },
  totalBalance: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Medium',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  walletContainer: {
    alignItems: 'flex-end',
  },
  walletIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 4,
  },
  walletName: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
    color: '#E0E0E0',
  },
  servicesContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceText: {
    color: '#2C3E50',
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center',
    maxWidth: 60,
    lineHeight: 14,
    marginTop: 4,
  },
  cardsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 12,
    color: '#333',
  },
  card: {
    width: width - 80,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  bank: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  number: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Regular',
    letterSpacing: 2,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 22,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  popupCardNumber: {
    fontSize: 20,
    fontFamily: 'RobotoMono-Regular',
    color: '#333',
    marginBottom: 6,
  },
  popupHolder: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#555',
    marginBottom: 6,
  },
  popupExpiry: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#555',
    marginBottom: 6,
  },
  popupBalance: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  recentActivityContainer: {
    marginTop: 20,
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    marginHorizontal: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    color: '#1F2937',
  },
  transactionCard: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: width * 0.6,
    height: '100%',
    backgroundColor: '#F8FAFC',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    color: '#1F2937',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1F2937',
    marginLeft: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
});

export default DashBoardScreen;