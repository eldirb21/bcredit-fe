import { Stack } from "expo-router";

export default function TagihanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="addTagihan" options={{ headerShown: false }} />
      <Stack.Screen name="detailTagihan" options={{ headerShown: false }} />
      <Stack.Screen
        name="payment"
        options={{
          presentation: "formSheet",
        }}
      />
      <Stack.Screen
        name="paymentSuccess"
        options={{
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
