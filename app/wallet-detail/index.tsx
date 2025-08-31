import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AccountCard from '../../components/AccountCard';

export default function WalletOverview() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AccountCard />
      <Button title="Deposit" onPress={() => router.push('./wallet-detail/deposit')} />
      <Button title="View Transactions" onPress={() => router.push('./wallet-detail/transactions')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
