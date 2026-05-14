import { Input } from "@/components/atoms";
import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPaymentScreen() {
  const [form, setForm] = useState({
    noKontrak: "",
    nama: "",
    nominal: "",
    metode: "Cash",
  });

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("SUBMIT:", form);

    // nanti disini:
    // - simpan ke API
    // - atau simpan ke local (offline-first)

    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icons name="arrow-left" size={20} />
            </TouchableOpacity>

            <Text style={styles.title}>Catat Pembayaran</Text>

            <View style={{ width: 20 }} />
          </View>

          {/* FORM */}
          <View style={{ gap: 12 }}>
            <Input
              label="No Kontrak"
              value={form.noKontrak}
              onChange={(v) => setField("noKontrak", v)}
            />

            <Input
              label="Nama"
              value={form.nama}
              onChange={(v) => setField("nama", v)}
            />

            <Input
              label="Nominal"
              value={form.nominal}
              keyboardType="numeric"
              onChange={(v) => setField("nominal", v)}
            />

            {/* METODE */}
            <View>
              <Text style={styles.label}>Metode Pembayaran</Text>
              <View style={styles.methodWrap}>
                {["Cash", "Transfer"].map((m) => (
                  <TouchableOpacity
                    key={m}
                    onPress={() => setField("metode", m)}
                    style={[
                      styles.methodBtn,
                      form.metode === m && styles.methodActive,
                    ]}
                  >
                    <Text
                      style={{
                        color: form.metode === m ? "#FFF" : "#374151",
                      }}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.submitText}>Simpan Pembayaran</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 16, fontWeight: "700" },

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

  methodWrap: {
    flexDirection: "row",
    gap: 10,
  },
  methodBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  methodActive: {
    backgroundColor: "#111827",
  },

  submitBtn: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
