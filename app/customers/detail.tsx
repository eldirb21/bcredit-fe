import { axiosInstance } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

  const [Item, setItem] = useState({});

  const formatRupiah = (num: number) => {
    if (!num) return "";
    return "Rp " + num.toLocaleString("id-ID");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`api/nasabah/${params?._id}`);
      setItem(result.data?.data);
    } catch (error) {
      console.log("DATA error:", error);
    }
  };
  console.log(Item);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icons name="arrow-left" size={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Detail Nasabah</Text>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/customers/edit",
                params: { _id: Item?._id },
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
              {Item.nama?.slice(0, 2)?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{Item.nama}</Text>
          <Text style={styles.sub}>{Item.phone}</Text>
          <Text style={styles.sub}>{Item.alamat}</Text>
        </View>

        {/* INFO KONTRAK */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informasi Kontrak</Text>

          <Info label="No Anggota" value={Item.anggota} />
          <Info label="No Pinjaman" value={formatRupiah(Item.nominal)} />
          <Info label="Pinjaman Pokok" value={formatRupiah(Item.nominal)} />
          <Info label="Jenis Angsuran" value={"Mingguan"} />
          <Info label="Tenor Angsuran" value={"6"} />
          <Info label="Angsuran" value={formatRupiah(Item.cicilan)} />
          {/* <Info label="Jatuh Tempo" value={formatDate(Item.jatuhTempo)} /> */}
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryWrap}>
          <Summary label="Total Pinjaman" value={formatRupiah(Item.nominal)} />
          <Summary label="Sisa" value={formatRupiah(Item.nominal)} danger />
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
                {formatRupiah(Item.cicilan)}
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
