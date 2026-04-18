import { Float } from "@/components/atoms";
import { Bill, Header, Section, Tab } from "@/components/molecules/home";

import { verticalScale } from "@/utils";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
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
        <Header lateData={lateData.length} onSearch={() => {}} />

        {/* CONTENT */}
        <View style={styles.content}>
          {/* TABS */}
          <Tab
            tabs={tabs}
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
          />

          {/* SECTION TERLAMBAT */}
          <Section
            title="PRIORITAS TERLAMBAT"
            open={sessions.late}
            onToggle={() => toggleSession("late")}
          >
            {lateData.map((item, i) => (
              <Bill
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
              <Bill
                key={`${item.noPelanggan}-${i}`}
                item={item}
                type="upcoming"
                formatDate={formatDate}
              />
            ))}
          </Section>
        </View>
      </ScrollView>

      <Float
        onFloat={() => router.push("/tagihan/addTagihan")}
        title="Catat Pembayaran"
        icon="plus"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  container: {
    paddingBottom: verticalScale(120),
  },

  content: {
    padding: verticalScale(16),
  },
});
