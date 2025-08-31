// app/(tabs)/wallet-detail/_layout.tsx
import { Stack } from 'expo-router';

export default function WalletDetailLayout() {
  return (
    <Stack 
    screenOptions={{
              // Hide the header for all other routes.
              headerShown: false,
            }}
    >
      {/* This registers app/(tabs)/wallet-detail/index.tsx */}
      <Stack.Screen 
        name="index" 
        options={{  headerShown: false }} 
      />

      {/* This registers app/(tabs)/wallet-detail/deposit.tsx */}
      <Stack.Screen 
        name="deposit" 
        options={{ title: 'Deposit Funds' }} 
      />

      {/* This registers app/(tabs)/wallet-detail/transactions.tsx */}
      <Stack.Screen 
        name="transactions" 
        options={{ title: 'Transactions' }} 
      />
    </Stack>
  );
}

