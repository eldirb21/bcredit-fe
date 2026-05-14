import { Icons } from "@/components/atoms";
import { ActionButton } from "@/components/molecules";
import { useAuth } from "@/hooks";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const { removeToken } = useAuth();

  const [user, setUser] = useState({
    name: "Eldiro",
    phone: "0813101817161",
  });

  const [showEdit, setShowEdit] = useState(false);


  const handlerLogout = () => {

    Alert.alert("Logout", "Yakin mau keluar?", [
      { text: "Batal" },
      {
        text: "Logout",
        style: "destructive",
        onPress: handleLogout,
      },
    ]);
  };

  const handleLogout = async () => {
    await removeToken();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.safe} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>

        {/* PROFILE */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.slice(0, 2).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setShowEdit(true)}
          >
            <Icons type="Feather" name="edit-2" size={14} color="#FFF" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        {/* <View style={styles.statsWrap}>
          <StatBox label="Nasabah Aktif" value={stats.nasabah.toString()} />
          <StatBox label="Berhasil" value={stats.success.toString()} success />
          <StatBox label="Target" value={`${stats.target}%`} info />
        </View> */}

        {/* MENU */}
        <View style={styles.menuCard}>
          <MenuItem
            icon="users"
            label="Data Nasabah"
            onPress={() => router.replace("/(tabs)/nasabah")}
          />
          {/* <MenuItem
            icon="credit-card"
            label="Riwayat Pembayaran"
            onPress={() => router.replace("/(tabs)/history")}
          />
          <MenuItem
            icon="bar-chart-2"
            label="Laporan"
            onPress={() => router.push("/settings/laporan")}
          />
          <MenuItem
            icon="settings"
            label="Pengaturan"
            onPress={() => router.push("/settings/pengaturan")}
          /> */}
          <View
            style={{
              height: 55,
              padding: 8,
            }}
          >
            <ActionButton
              dark
              label="Logout"
              icon={"log-out"}
              onPress={handlerLogout}
            />
          </View>
        </View>

        {/* ACTION */}

        {/* MODAL EDIT */}
        <EditProfileModal
          visible={showEdit}
          user={user}
          onClose={() => setShowEdit(false)}
          onSave={(data) => {
            setUser(data);
            setShowEdit(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= MODAL ================= */

const EditProfileModal = ({ visible, onClose, user, onSave }: any) => {
  const [form, setForm] = useState(user);

  const setField = (k: string, v: string) =>
    setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalWrap}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

          <Input
            label="Nama"
            value={form.name}
            onChange={(v) => setField("name", v)}
          />
          <Input
            label="No HP"
            value={form.phone}
            onChange={(v) => setField("phone", v)}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: "#6B7280" }}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSave(form)}>
              <Text style={{ color: "#111827", fontWeight: "700" }}>
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/* ================= COMPONENT ================= */

const Input = ({ label, value, onChange }: any) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChange} style={styles.input} />
  </View>
);

const StatBox = ({ label, value, success, info }: any) => {
  const color = success ? "#16A34A" : info ? "#2563EB" : "#111827";

  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const MenuItem = ({ icon, label, danger, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Icons
        type="Feather"
        name={icon}
        size={18}
        color={danger ? "#DC2626" : "#374151"}
      />
      <Text style={[styles.menuText, danger && { color: "#DC2626" }]}>
        {label}
      </Text>
    </View>
    <Icons type="Feather" name="chevron-right" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  container: {
    padding: 16,
    paddingBottom: 120,
  },

  header: { alignItems: "center", paddingVertical: 12 },

  title: { fontWeight: "700", fontSize: 16 },

  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },

  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  avatarText: {
    color: "#991B1B",
    fontWeight: "700",
    fontSize: 18,
  },

  name: { fontWeight: "700", fontSize: 16 },

  phone: { fontSize: 13, color: "#6B7280", marginBottom: 10 },

  editBtn: {
    flexDirection: "row",
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },

  editText: { color: "#FFF", fontSize: 12 },

  statsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  statBox: {
    backgroundColor: "#FFF",
    width: "30%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  statValue: { fontSize: 16, fontWeight: "700" },

  statLabel: { fontSize: 11, color: "#6B7280", textAlign: "center" },

  menuCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    flex: 1,
    justifyContent: "space-between",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    alignItems: "center",
  },

  menuLeft: { flexDirection: "row", gap: 10, alignItems: "center" },

  menuText: { fontSize: 14, fontWeight: "500" },

  /* MODAL */
  modalWrap: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    padding: 16,
  },

  modalCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontWeight: "700",
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#6B7280",
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 8,
  },
});
