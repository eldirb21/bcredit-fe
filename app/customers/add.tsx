import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCustomerScreen() {
  const [form, setForm] = useState({
    nama: "",
    phone: "",
    alamat: "",
    noKontrak: "",
    nominal: "",
    cicilan: "",
    jatuhTempo: "",
  });

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("DATA CUSTOMER:", form);

    // next:
    // simpan ke DB / API

    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icons name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>Tambah Konsumen</Text>
            <View style={{ width: 20 }} />
          </View>

          {/* FORM */}
          <Section title="Data Konsumen">
            <Input
              label="Nama"
              value={form.nama}
              onChange={(v) => setField("nama", v)}
            />
            <Input
              label="No HP"
              value={form.phone}
              onChange={(v) => setField("phone", v)}
              keyboard="phone-pad"
            />
            <Input
              label="Alamat"
              value={form.alamat}
              onChange={(v) => setField("alamat", v)}
              multiline
            />
          </Section>

          <Section title="Data Pembiayaan">
            <Input
              label="No Kontrak"
              value={form.noKontrak}
              onChange={(v) => setField("noKontrak", v)}
            />
            <Input
              label="Nominal Pinjaman"
              value={form.nominal}
              onChange={(v) => setField("nominal", v)}
              keyboard="numeric"
            />
            <Input
              label="Cicilan / Bulan"
              value={form.cicilan}
              onChange={(v) => setField("cicilan", v)}
              keyboard="numeric"
            />
            <Input
              label="Jatuh Tempo (YYYY-MM-DD)"
              value={form.jatuhTempo}
              onChange={(v) => setField("jatuhTempo", v)}
            />
          </Section>

          {/* BUTTON */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.submitText}>Simpan Konsumen</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={{ gap: 10 }}>{children}</View>
  </View>
);

const Input = ({
  label,
  value,
  onChange,
  keyboard,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  keyboard?: any;
  multiline?: boolean;
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType={keyboard}
      multiline={multiline}
      style={[styles.input, multiline && { height: 80 }]}
      placeholder={`Masukkan ${label}`}
    />
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#374151",
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#6B7280",
  },

  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  submitBtn: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
