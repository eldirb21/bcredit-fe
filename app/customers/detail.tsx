import Icons from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomerDetail() {
  const params = useLocalSearchParams();

  const data = {
    nama: params.nama as string,
    phone: params.phone as string,
    alamat: params.alamat as string,
    noKontrak: params.noKontrak as string,
    nominal: Number(params.nominal || 0),
    cicilan: Number(params.cicilan || 0),
    jatuhTempo: params.jatuhTempo as string,
  };

  const formatRupiah = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icons name="arrow-left" size={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Detail Konsumen</Text>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/customers/edit",
                params,
              })
            }
          >
            <Icons name="edit-2" size={18} />
          </TouchableOpacity>
        </View>

        {/* PROFILE */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontWeight: "700", fontSize: 18 }}>
              {data.nama?.slice(0, 2).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{data.nama}</Text>
          <Text style={styles.sub}>{data.phone}</Text>
          <Text style={styles.sub}>{data.alamat}</Text>
        </View>

        {/* INFO KONTRAK */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informasi Kontrak</Text>

          <Info label="No Kontrak" value={data.noKontrak} />
          <Info label="Nominal" value={formatRupiah(data.nominal)} />
          <Info label="Cicilan / Bulan" value={formatRupiah(data.cicilan)} />
          <Info label="Jatuh Tempo" value={formatDate(data.jatuhTempo)} />
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryWrap}>
          <Summary label="Total Pinjaman" value={formatRupiah(data.nominal)} />
          <Summary label="Sisa" value={formatRupiah(data.nominal)} danger />
          <Summary label="Status" value="Aktif" success />
        </View>

        {/* RIWAYAT (dummy dulu) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Riwayat Pembayaran</Text>

          {[1, 2].map((_, i) => (
            <View key={i} style={styles.historyItem}>
              <View>
                <Text style={{ fontWeight: "600" }}>Cicilan ke-{i + 1}</Text>
                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                  15 Apr 2026 • Cash
                </Text>
              </View>

              <Text style={{ fontWeight: "700" }}>
                {formatRupiah(data.cicilan)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BUTTON */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/tagihan/addTagihan",
            params,
          })
        }
        style={styles.fab}
      >
        <Icons name="plus" size={18} color="#FFF" />
        <Text style={styles.fabText}>Catat Pembayaran</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* COMPONENT */
const Info = ({ label, value }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || "-"}</Text>
  </View>
);

const Summary = ({ label, value, danger, success }: any) => {
  const bg = danger ? "#FEE2E2" : success ? "#DCFCE7" : "#E5E7EB";

  return (
    <View style={[styles.summaryBox, { backgroundColor: bg }]}>
      <Text style={{ fontWeight: "700" }}>{value}</Text>
      <Text style={{ fontSize: 11 }}>{label}</Text>
    </View>
  );
};

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  container: {
    padding: 16,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "700",
  },

  profileCard: {
    alignItems: "center",
    marginVertical: 16,
  },

  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  name: { fontWeight: "700", fontSize: 16 },
  sub: { fontSize: 12, color: "#6B7280" },

  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  infoLabel: { color: "#6B7280", fontSize: 12 },
  infoValue: { fontWeight: "600" },

  summaryWrap: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  summaryBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  fab: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  fabText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
