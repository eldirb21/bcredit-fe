import { useAuth } from '@/hooks/use-auth'
import { Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }
  return token ? <Redirect href="/(tabs)" /> : <Redirect href="/auth/login" />
}
