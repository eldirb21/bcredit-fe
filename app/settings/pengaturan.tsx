import Icons from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notif, setNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Yakin mau keluar?", [
      { text: "Batal" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          console.log("LOGOUT...");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Pengaturan</Text>

        {/* ACCOUNT */}
        <Section title="Akun">
          <MenuItem icon="user" label="Edit Profile" />
          <MenuItem icon="lock" label="Ubah Password" />
        </Section>

        {/* PREFERENCES */}
        <Section title="Preferensi">
          <SwitchItem
            icon="bell"
            label="Notifikasi"
            value={notif}
            onChange={setNotif}
          />
          <SwitchItem
            icon="moon"
            label="Dark Mode"
            value={darkMode}
            onChange={setDarkMode}
          />
          <SwitchItem
            icon="refresh-cw"
            label="Auto Sync Data"
            value={autoSync}
            onChange={setAutoSync}
          />
        </Section>

        {/* APP */}
        <Section title="Aplikasi">
          <MenuItem icon="database" label="Backup Data" />
          <MenuItem icon="download" label="Restore Data" />
          <MenuItem icon="info" label="Tentang Aplikasi" />
        </Section>

        {/* ACTION */}
        <Section title="">
          <MenuItem
            icon="log-out"
            label="Logout"
            danger
            onPress={handleLogout}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 16 }}>
    {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
    <View style={styles.card}>{children}</View>
  </View>
);

const MenuItem = ({ icon, label, danger, onPress }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.left}>
      <Icons name={icon} size={18} color={danger ? "#DC2626" : "#374151"} />
      <Text style={[styles.label, danger && { color: "#DC2626" }]}>
        {label}
      </Text>
    </View>

    <Icons name="chevron-right" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

const SwitchItem = ({ icon, label, value, onChange }: any) => (
  <View style={styles.item}>
    <View style={styles.left}>
      <Icons name={icon} size={18} color="#374151" />
      <Text style={styles.label}>{label}</Text>
    </View>

    <Switch value={value} onValueChange={onChange} />
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  container: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 6,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
});
