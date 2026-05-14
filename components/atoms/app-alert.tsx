import React from 'react'

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { selectAlert } from '@/store/app/app.selector'
import { hideAlert } from '@/store/app/app.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function AppAlert() {
  const dispatch = useAppDispatch()

  const alert = useAppSelector(selectAlert)

  return (
    <Modal visible={alert.visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{alert.title}</Text>

          <Text style={styles.message}>{alert.message}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(hideAlert())}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.5)',

    justifyContent: 'center',

    alignItems: 'center',
  },

  container: {
    width: '85%',

    backgroundColor: '#fff',

    borderRadius: 24,

    padding: 24,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    marginBottom: 10,
  },

  message: {
    fontSize: 15,

    color: '#666',

    marginBottom: 20,
  },

  button: {
    backgroundColor: '#0EA5E9',

    borderRadius: 14,

    paddingVertical: 14,

    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',

    fontWeight: '700',
  },
})
