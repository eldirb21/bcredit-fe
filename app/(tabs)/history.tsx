import { formatRupiah } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Payment = {
  noKontrak: string;
  cicilanKe: number;
  nominal: number;
  payDate: string;
  status: "Lunas" | "Terlambat";
  paymentMethod?: string;
};

const payments: Payment[] = [
  {
    noKontrak: "KTA-2024-00871",
    cicilanKe: 12,
    nominal: 2250000,
    payDate: "2026-04-17T23:00:27.608Z",
    status: "Lunas",
    paymentMethod: "Transfer",
  },
  {
    noKontrak: "KTA-2024-00871",
    cicilanKe: 12,
    nominal: 2250000,
    payDate: "2026-04-17T23:00:27.608Z",
    status: "Lunas",
    paymentMethod: "Cash",
  },
  {
    noKontrak: "KTA-2024-00871",
    cicilanKe: 12,
    nominal: 2250000,
    payDate: "2026-04-17T23:00:27.608Z",
    status: "Terlambat",
  },
];

const formatDate = (date: string) => {
  const d = new Date(date);

  const datePart = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
  });

  const timePart = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} • ${timePart}`;
};

const getStatusColor = (status: Payment["status"]) => {
  return status === "Terlambat" ? "#DC2626" : "#16A34A";
};

const getStatusBg = (status: Payment["status"]) => {
  return status === "Terlambat" ? "#FEE2E2" : "#DCFCE7";
};

const HistoryItem = ({ item }: { item: Payment }) => {
  const isLate = item.status === "Terlambat";

  return (
    <View style={styles.itemWrap}>
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: getStatusBg(item.status) },
          ]}
        >
          <Icons
            name={isLate ? "alert-circle" : "check-circle"}
            size={16}
            color={getStatusColor(item.status)}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.contractText}>{item.noKontrak}</Text>

          <Text style={styles.descText}>
            {isLate
              ? "Belum dibayar"
              : `Cicilan ke-${item.cicilanKe} • ${item.paymentMethod || "-"}`}
          </Text>
        </View>
      </View>

      <View style={styles.itemRight}>
        <Text style={styles.amountText}>{formatRupiah(item.nominal)}</Text>

        <Text style={{ color: getStatusColor(item.status), fontSize: 12 }}>
          {isLate ? "Terlambat" : formatDate(item.payDate)}
        </Text>
      </View>
    </View>
  );
};

const History = () => {
  const total = payments.reduce((acc, cur) => acc + cur.nominal, 0);
  const successCount = payments.filter((p) => p.status === "Lunas").length;
  const lateCount = payments.filter((p) => p.status === "Terlambat").length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>CATAT PEMBAYARAN</Text>
        </View>

        {/* SUMMARY CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Riwayat Tagihan</Text>
          <Text style={styles.cardSub}>
            Total bulan ini: {formatRupiah(total)}
          </Text>

          <View style={styles.monthWrap}>
            {["Apr 2026", "Mar 2026", "Feb 2026"].map((m) => (
              <View key={m} style={styles.monthChip}>
                <Text style={styles.monthText}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsWrap}>
          <StatBox label="Berhasil" value={successCount} success />
          <StatBox label="Terlambat" value={lateCount} />
          <StatBox label="Total" value={formatRupiah(total)} success />
        </View>

        {/* LIST */}
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionTitle}>TRANSAKSI TERBARU</Text>

          <View style={styles.listCard}>
            {payments.map((item, index) => (
              <React.Fragment key={`${item.noKontrak}-${index}`}>
                <HistoryItem item={item} />
                {index !== payments.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatBox = ({
  label,
  value,
  success,
}: {
  label: string;
  value: number | string;
  success?: boolean;
}) => {
  return (
    <View
      style={[
        styles.statBox,
        { backgroundColor: success ? "#DCFCE7" : "#FEE2E2" },
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: success ? "#16A34A" : "#DC2626",
        }}
      >
        {value}
      </Text>
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  header: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
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
    gap: 6,
  },
  cardTitle: {
    color: "#FFF",
    fontWeight: "600",
  },
  cardSub: {
    color: "#D1D5DB",
    fontSize: 13,
  },
  monthWrap: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  monthChip: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  monthText: {
    fontSize: 12,
  },
  statsWrap: {
    flexDirection: "row",
    gap: 8,
  },
  statBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#6B7280",
    fontSize: 13,
  },
  listCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
  },
  itemWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
  iconWrap: {
    padding: 6,
    borderRadius: 8,
  },
  contractText: {
    fontWeight: "600",
    fontSize: 13,
  },
  descText: {
    fontSize: 12,
    color: "#6B7280",
  },
  itemRight: {
    alignItems: "flex-end",
  },
  amountText: {
    fontWeight: "700",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 10,
  },
});
