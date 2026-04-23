import { Stack } from "expo-router";

export default function TagihanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add" options={{ headerShown: false }} />
      <Stack.Screen name="detail" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "formSheet",
        }}
      />
      <Stack.Screen
        name="ajukanPinjaman"
        options={{
          presentation: "formSheet",
          animation: "flip",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
