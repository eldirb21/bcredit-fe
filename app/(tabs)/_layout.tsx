import Icons from '@expo/vector-icons/Feather'
import { Tabs } from 'expo-router'
import React from 'react'

import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const tabs = [
    {
      path: 'index',
      title: 'Home',
      icon: (color: string) => <Icons size={24} name="home" color={color} />,
    },
    {
      path: 'nasabah',
      title: 'Nasabah',
      icon: (color: string) => <Icons size={24} name="users" color={color} />,
    },
    {
      path: 'settings',
      title: 'Settings',
      icon: (color: string) => (
        <Icons size={24} name="settings" color={color} />
      ),
    },
  ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      {tabs.map((x, i) => (
        <Tabs.Screen
          key={i}
          name={x.path}
          options={{
            title: x.title,
            tabBarIcon: ({ color }) => x.icon(color),
          }}
        />
      ))}
    </Tabs>
  )
}
