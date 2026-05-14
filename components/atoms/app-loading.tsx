import React from 'react'

import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'

import { useAppSelector } from '@/store/hooks'

import { selectLoading, selectLoadingCount } from '@/store/app/app.selector'

export function AppLoading() {
  const loading = useAppSelector(selectLoading)

  const loadingCount = useAppSelector(selectLoadingCount)

  return (
    <Modal visible={loading} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />

          <Text style={styles.text}>Loading...</Text>

          {/* <Text style={styles.subtext}>Active Requests: {loadingCount}</Text> */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.4)',

    justifyContent: 'center',

    alignItems: 'center',
  },

  container: {
    width: 180,

    backgroundColor: '#fff',

    borderRadius: 24,

    padding: 24,

    alignItems: 'center',
  },

  text: {
    marginTop: 16,

    fontSize: 16,

    fontWeight: '700',
  },

  subtext: {
    marginTop: 6,

    color: '#666',
  },
})
