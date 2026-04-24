import { DateTimes, SelectInput } from "@/components/atoms";
import { Input } from "@/components/atoms/Input";
import { ActionButton } from "@/components/molecules";
import { formatRupiah, PAYMENT_METHODS } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Payment = () => {
  const params = useLocalSearchParams();

  // ✅ STATE FORM
  const [form, setForm] = useState({
    amount: "",
    date: null as Date | null,
    time: null as Date | null,
    method: "",
    collector: "",
    note: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ✅ HANDLE CHANGE
  const handleChange = (key: string, value: string | Date) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev: any) => ({ ...prev, [key]: "" }));
  };

  // ✅ VALIDASI
  const validate = () => {
    let newErrors: any = {};

    if (!form.amount) newErrors.amount = "Jumlah wajib diisi";
    if (!form.date) newErrors.date = "Tanggal wajib diisi";
    if (!form.time) newErrors.time = "Jam wajib diisi";
    if (!form.method) newErrors.method = "Metode wajib diisi";
    if (!form.collector) newErrors.collector = "Nama kolektor wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    // if (!validate()) return;

    try {
      setLoading(true);

      // simulasi API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/tagihan/paymentSuccess");
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  // ✅ COMPONENT INPUT BIAR RAPI

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.titleWrap}>
            <Text style={styles.title}>CATAT PEMBAYARAN</Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.back}
              >
                <Icons name="arrow-left" color="#FFF" size={18} />
                <Text style={{ color: "#FFF" }}>Kembali</Text>
              </TouchableOpacity>

              <Text style={{ color: "#FFF", fontWeight: "600" }}>
                Catat Pembayaran
              </Text>
            </View>

            <View>
              <Text style={styles.name}>{params.nama || "Budi Santoso"}</Text>
              <Text style={styles.sub}>{params.noPelanggan || "001"}</Text>
            </View>
          </View>

          {/* INFO */}
          <View style={styles.info}>
            <Row label="Angsuran ke-" value="12" />
            <Row label="Tagihan" value={formatRupiah(200000)} />
            <Row label="Jatuh tempo" value="1 April 2026 (terlambat)" danger />
          </View>

          {/* FORM */}
          <Input
            label="JUMLAH DIBAYAR"
            value={form.amount}
            onChange={(v: string) => handleChange("amount", v)}
            placeholder="Rp"
            keyboardType="numeric"
            error={errors.amount}
          />

          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1, gap: 6 }}>
              {/* DATE */}
              <Text style={styles.label}>{"TANGGAL BAYAR"}</Text>
              <DateTimes
                value={form.date || new Date()}
                type="date"
                placeholder="Pilih tanggal"
                onChangeDate={(v: Date) => handleChange("date", v)}
              />
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              {/* TIME */}
              <Text style={styles.label}>{"JAM"}</Text>
              <DateTimes
                value={form.date || new Date()}
                type="time"
                placeholder="Pilih jam"
                onChangeDate={(v: Date) => handleChange("time", v)}
              />
            </View>
          </View>

          <SelectInput
            label="METODE PEMBAYARAN"
            value={form.method}
            options={PAYMENT_METHODS}
            onSelect={(val) => handleChange("method", val)}
            error={errors.method}
          />

          <Input
            label="KOLEKTOR"
            value={form.collector}
            onChange={(v: string) => handleChange("collector", v)}
            placeholder="Ahmad"
            error={errors.collector}
          />

          <Input
            label="CATATAN (OPTIONAL)"
            value={form.note}
            onChange={(v: string) => handleChange("note", v)}
            placeholder="Tambahan info..."
          />
        </ScrollView>

        <View
          style={{
            height: 45,
            marginHorizontal: 12,
          }}
        >
          <ActionButton
            icon="check"
            label={loading ? "Menyimpan..." : "Simpan & Cetak Bukti"}
            dark
            disabled={loading}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Payment;

/* 🔥 ROW INFO */
const Row = ({ label, value, danger }: any) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, danger && { color: "#d00e0e" }]}>
      {value}
    </Text>
  </View>
);

/* 🔥 STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  container: {
    flex: 1,
    padding: 12,
    gap: 10,
  },
  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  title: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  back: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 6,
    borderRadius: 8,
  },
  name: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  sub: {
    color: "#9CA3AF",
  },
  info: {
    backgroundColor: "#0856a024",
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowLabel: {
    color: "#0e55d0",
    fontWeight: "500",
  },
  rowValue: {
    color: "#0e55d0",
    fontWeight: "500",
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#000",
    borderRadius: 12,
    color: "#FFF",
    height: 45,
    paddingHorizontal: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});
