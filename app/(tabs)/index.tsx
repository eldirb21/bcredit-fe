import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SessionKey = "late" | "upcoming";

type Item = {
  nama: string;
  jatuhTempo: string;
  noPelanggan: string;
  cicilanKe: string;
  status?: "Terlambat" | "Lunas";
};

const DATA: Item[] = [
  {
    nama: "Jojo",
    jatuhTempo: "2026-03-15",
    noPelanggan: "KTA-2024-00871",
    cicilanKe: "12",
    status: "Terlambat",
  },
  {
    nama: "Budi",
    jatuhTempo: "2026-04-20",
    noPelanggan: "KTA-2024-00872",
    cicilanKe: "5",
  },
];

export default function HomeScreen() {
  const [tabSelected, setTabSelected] = useState("Semua");
  const [sessions, setSessions] = useState({
    late: true,
    upcoming: true,
  });

  const tabs = ["Semua", "Terlambat", "Lunas"];

  const lateData = useMemo(
    () => DATA.filter((x) => x.status === "Terlambat"),
    [],
  );

  const upcomingData = useMemo(
    () => DATA.filter((x) => x.status !== "Terlambat"),
    [],
  );

  const toggleSession = (key: SessionKey) => {
    setSessions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Daftar Tagihan</Text>
              <Text style={styles.subtitle}>Area Jakarta • April 2026</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{lateData.length} Terlambat</Text>
            </View>
          </View>

          {/* SEARCH */}
          <TouchableOpacity style={styles.searchBox}>
            <Icons name="search" size={16} color="#9CA3AF" />
            <Text style={styles.searchText}>Cari nama / no kontrak</Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* TABS */}
          <View style={styles.tabWrap}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setTabSelected(tab)}
                style={[styles.tab, tabSelected === tab && styles.tabActive]}
              >
                <Text
                  style={[
                    styles.tabText,
                    tabSelected === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SECTION TERLAMBAT */}
          <Section
            title="PRIORITAS TERLAMBAT"
            open={sessions.late}
            onToggle={() => toggleSession("late")}
          >
            {lateData.map((item, i) => (
              <BillItem
                key={`${item.noPelanggan}-${i}`}
                item={item}
                type="late"
                formatDate={formatDate}
              />
            ))}
          </Section>

          {/* SECTION UPCOMING */}
          <Section
            title="SEGERA JATUH TEMPO"
            open={sessions.upcoming}
            onToggle={() => toggleSession("upcoming")}
          >
            {upcomingData.map((item, i) => (
              <BillItem
                key={`${item.noPelanggan}-${i}`}
                item={item}
                type="upcoming"
                formatDate={formatDate}
              />
            ))}
          </Section>
        </View>
      </ScrollView>

      {/* FLOAT BUTTON */}
      <TouchableOpacity
        onPress={() => router.push("/tagihan/addTagihan")}
        style={styles.fab}
      >
        <Icons name="plus" size={18} color="#FFF" />
        <Text style={styles.fabText}>Catat Pembayaran</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

const Section = ({ title, open, onToggle, children }: any) => (
  <View style={{ marginBottom: 12 }}>
    <TouchableOpacity onPress={onToggle} style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Icons
        name={open ? "chevron-up" : "chevron-right"}
        size={20}
        color="#6B7280"
      />
    </TouchableOpacity>

    {open && <View style={{ gap: 10 }}>{children}</View>}
  </View>
);

const BillItem = ({
  item,
  type,
  formatDate,
}: {
  item: Item;
  type: "late" | "upcoming";
  formatDate: (d: string) => string;
}) => {
  const isLate = type === "late";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/tagihan/detailTagihan",
          params: item,
        })
      }
      style={styles.item}
    >
      {/* AVATAR */}
      <View
        style={[
          styles.avatar,
          { backgroundColor: isLate ? "#FEE2E2" : "#DBEAFE" },
        ]}
      >
        <Text
          style={{
            color: isLate ? "#991B1B" : "#1E3A8A",
            fontWeight: "700",
          }}
        >
          {item.nama.slice(0, 2).toUpperCase()}
        </Text>
      </View>

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.contract}>{item.noPelanggan}</Text>
        <Text style={styles.desc}>
          {item.nama} • Cicilan {item.cicilanKe}
        </Text>
      </View>

      {/* DATE */}
      <View
        style={[
          styles.dateBox,
          { backgroundColor: isLate ? "#FEE2E2" : "#E0F2FE" },
        ]}
      >
        <Text
          style={{
            fontSize: 11,
            color: isLate ? "#B91C1C" : "#0369A1",
          }}
        >
          {formatDate(item.jatuhTempo)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },
  container: { paddingBottom: 120 },

  header: {
    backgroundColor: "#1F2937",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, color: "#FFF", fontWeight: "700" },
  subtitle: { fontSize: 13, color: "#9CA3AF" },

  badge: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: "#FFF", fontSize: 12 },

  searchBox: {
    marginTop: 12,
    backgroundColor: "#374151",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  searchText: { color: "#9CA3AF" },

  content: { padding: 16 },

  tabWrap: { flexDirection: "row", gap: 10, marginBottom: 12 },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: { backgroundColor: "#111827" },
  tabText: { color: "#6B7280", fontWeight: "600" },
  tabTextActive: { color: "#FFF" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#6B7280",
    fontSize: 13,
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 10,
    elevation: 2,
  },

  avatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  contract: { fontWeight: "600", color: "#111827" },
  desc: { fontSize: 12, color: "#6B7280" },

  dateBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  fab: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    gap: 10,
  },
  fabText: { color: "#FFF", fontWeight: "600" },
});
