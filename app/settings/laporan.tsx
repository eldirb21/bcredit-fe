import React, { useMemo, useState } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ReportItem = {
  id: string;
  nama: string;
  nominal: number;
  status: "Lunas" | "Terlambat";
  date: string;
};

export default function LaporanScreen() {
  const [selectedMonth, setSelectedMonth] = useState("Apr 2026");

  const data: ReportItem[] = [
    {
      id: "1",
      nama: "Jojo",
      nominal: 2500000,
      status: "Lunas",
      date: "2026-04-15",
    },
    {
      id: "2",
      nama: "Budi",
      nominal: 2500000,
      status: "Terlambat",
      date: "2026-04-10",
    },
  ];

  const months = ["Apr 2026", "Mar 2026", "Feb 2026"];

  /* ================= SUMMARY ================= */
  const summary = useMemo(() => {
    let total = 0;
    let success = 0;
    let late = 0;

    data.forEach((x) => {
      total += x.nominal;
      if (x.status === "Lunas") success++;
      if (x.status === "Terlambat") late++;
    });

    return { total, success, late };
  }, [data]);

  const formatRupiah = (num: number) => "Rp " + num.toLocaleString("id-ID");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Laporan</Text>
      </View>

      {/* FILTER BULAN */}
      <View style={styles.monthWrap}>
        {months.map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setSelectedMonth(m)}
            style={[styles.monthBtn, selectedMonth === m && styles.monthActive]}
          >
            <Text
              style={[
                styles.monthText,
                selectedMonth === m && { color: "#FFF" },
              ]}
            >
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryWrap}>
        <SummaryBox label="Total" value={formatRupiah(summary.total)} />
        <SummaryBox
          label="Berhasil"
          value={summary.success.toString()}
          success
        />
        <SummaryBox label="Terlambat" value={summary.late.toString()} danger />
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.nama}</Text>
              <Text style={styles.sub}>{item.date}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.amount}>{formatRupiah(item.nominal)}</Text>

              <Text
                style={{
                  fontSize: 12,
                  color: item.status === "Lunas" ? "#16A34A" : "#DC2626",
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

const SummaryBox = ({ label, value, success, danger }: any) => {
  const bg = success ? "#DCFCE7" : danger ? "#FEE2E2" : "#E5E7EB";

  return (
    <View style={[styles.summaryBox, { backgroundColor: bg }]}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  header: {
    alignItems: "center",
    padding: 12,
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
  },

  monthWrap: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },

  monthBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },

  monthActive: {
    backgroundColor: "#111827",
  },

  monthText: {
    fontSize: 12,
    color: "#111827",
  },

  summaryWrap: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  summaryBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },

  summaryValue: {
    fontWeight: "700",
  },

  summaryLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: {
    fontWeight: "600",
  },

  sub: {
    fontSize: 12,
    color: "#6B7280",
  },

  amount: {
    fontWeight: "700",
  },
});
