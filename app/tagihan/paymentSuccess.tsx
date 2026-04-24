import { ActionButton } from "@/components/molecules";
import { formatRupiah } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentSuccess = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#e3e3e3" />

      <View style={styles.container}>
        {/* TITLE */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>PEMBAYARAN BERHASIL</Text>
        </View>

        {/* SUCCESS HEADER */}
        <View style={{ alignItems: "center", gap: 12, marginBottom: 12 }}>
          <View style={styles.successIcon}>
            <Icons name="check" size={40} color="#16a34a" />
          </View>

          <Text style={styles.successTitle}>Pembayaran Dicatat!</Text>

          <Text style={styles.successDesc}>
            Angsuran ke-12 berhasil dicatat pada 15 Apr 2026
          </Text>
        </View>

        {/* RECEIPT */}
        <View style={styles.card}>
          <View style={styles.dashedBox}>
            <Row label="No. Pinjaman" value="001" />
            <Row label="Nama" value="Agus Santoso" />
            <Row label="Angsuran ke-" value="12" />
            <Row label="Tanggal" value="12 April 2026" />
            <Row label="Metode" value="Cash" />
            {/* <Row label="Kolektor" value="Ahmad" /> */}
          </View>

          <Text style={styles.amount}>{formatRupiah(200000)}</Text>

          <Text style={styles.note}>
            Terima kasih atas pembayaran Anda. Simpan struk ini sebagai bukti.
          </Text>
        </View>
      </View>

      {/* ACTION */}
      <View style={{ flexDirection: "row", margin: 8, gap: 8 }}>
        <ActionButton
          icon="share"
          label="Belum Lunas"
          onPress={() =>
            Alert.alert(
              "Info",
              "Pembayaran Belum lunas ini akan tersimpan sementara",
            )
          }
        />
        <ActionButton
          icon="printer"
          label="Print"
          dark
          onPress={() => router.push("/tagihan/printPreview")}
        />
      </View>

      {/* BACK */}
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={styles.backBtn}
      >
        <Icons name="arrow-left" size={20} color="#6B7280" />
        <Text style={styles.backText}>Kembali ke Daftar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

/* 🔥 ROW */
const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

/* 🔥 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 12,
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

  successIcon: {
    backgroundColor: "rgba(34,197,94,0.15)",
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#16a34a",
  },
  successDesc: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 12,
    gap: 10,
  },

  dashedBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    paddingVertical: 10,
    gap: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowLabel: {
    color: "#6B7280",
  },
  rowValue: {
    fontWeight: "600",
    color: "#111827",
  },

  amount: {
    textAlign: "right",
    color: "#16a34a",
    fontSize: 20,
    fontWeight: "700",
  },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },

  backBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  backText: {
    color: "#6B7280",
    fontWeight: "500",
  },
});
