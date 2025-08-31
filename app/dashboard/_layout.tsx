// app/(tabs)/wallet-detail/_layout.tsx
import { Stack } from 'expo-router';

export default function DashBoardLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}