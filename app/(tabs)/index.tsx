"use client";

import { Float, Texts } from "@/components/atoms";
import { Bill, Header, Section, Tab } from "@/components/molecules/home";
import { axiosInstance, verticalScale } from "@/utils";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SessionKey = "late" | "scheduled" | "paid";

type Item = {
  nama: string;
  jatuhTempo: string;
  noPinjaman: string;
  cicilanKe: string;
  status?: "Terlambat" | "Lunas" | "Terjadwal";
};

const generateDummy = (count: number): Item[] => {
  return Array.from({ length: count }).map((_, i) => ({
    nama: `Nasabah ${i + 1}`,
    jatuhTempo: `2026-04-${(i % 28) + 1}`,
    noPinjaman: String(1000 + i),
    cicilanKe: String((i % 12) + 1),
    status: i % 3 === 0 ? "Terlambat" : i % 3 === 1 ? "Terjadwal" : "Lunas",
  }));
};

export default function HomeScreen() {
  const [tabSelected, setTabSelected] = useState("Semua");
  const [sessions, setSessions] = useState({
    late: true,
    scheduled: true,
    paid: true,
  });

  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const tabs = ["Semua", "Terlambat", "Lunas", "Terjadwal"];

  // 🔥 INIT DATA
  useEffect(() => {
    loadInitial();
  }, []);

  const loadInitial = async () => {
    try {
      const result = await axiosInstance.get("pinjaman");
      const initial = generateDummy(10);
      console.log(result.data);
      setData(initial);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔄 REFRESH
  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setData(generateDummy(10));
      setPage(1);
      setRefreshing(false);
    }, 1000);
  };

  // ⬇️ LOAD MORE
  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const more = generateDummy(10).map((x, i) => ({
        ...x,
        noPinjaman: String(2000 + page * 10 + i),
      }));

      setData((prev) => [...prev, ...more]);
      setPage((p) => p + 1);
      setLoadingMore(false);
    }, 1000);
  };

  // 🔥 FILTER BERDASARKAN TAB
  const filteredData = useMemo(() => {
    if (tabSelected === "Terlambat") {
      return data.filter((x) => x.status === "Terlambat");
    }
    if (tabSelected === "Lunas") {
      return data.filter((x) => x.status === "Lunas");
    }
    if (tabSelected === "Terjadwal") {
      return data.filter((x) => x.status === "Terjadwal");
    }
    return data;
  }, [tabSelected, data]);

  // 🔥 GROUPING
  const lateData = filteredData.filter((x) => x.status === "Terlambat");
  const scheduledData = filteredData.filter((x) => x.status === "Terjadwal");
  const paidData = filteredData.filter((x) => x.status === "Lunas");

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

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

          const isEnd =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;

          if (isEnd) loadMore();
        }}
        scrollEventThrottle={16}
      >
        <Header
          lateData={lateData.length}
          onSearch={() => router.push("/tagihan/searchTagihan")}
        />

        <View style={styles.content}>
          {/* TABS */}
          <Tab
            tabs={tabs}
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
          />

          {/* TERLAMBAT */}
          {lateData.length > 0 && (
            <Section
              title="PRIORITAS TERLAMBAT"
              open={sessions.late}
              onToggle={() => toggleSession("late")}
            >
              {lateData.map((item, i) => (
                <Bill
                  key={`${item.noPinjaman}-${i}`}
                  item={item}
                  type="late"
                  formatDate={formatDate}
                />
              ))}
            </Section>
          )}

          {/* LUNAS */}
          {paidData.length > 0 && (
            <Section
              title="LUNAS"
              open={sessions.paid}
              onToggle={() => toggleSession("paid")}
            >
              {paidData.map((item, i) => (
                <Bill
                  key={`${item.noPinjaman}-${i}`}
                  item={item}
                  type="paid"
                  formatDate={formatDate}
                />
              ))}
            </Section>
          )}

          {/* TERJADWAL */}
          {scheduledData.length > 0 && (
            <Section
              title="TERJADWAL"
              open={sessions.scheduled}
              onToggle={() => toggleSession("scheduled")}
            >
              {scheduledData.map((item, i) => (
                <Bill
                  key={`${item.noPinjaman}-${i}`}
                  item={item}
                  type="scheduled"
                  formatDate={formatDate}
                />
              ))}
            </Section>
          )}
        </View>
        {loadingMore && (
          <View style={{ padding: 16 }}>
            <Texts>Loading more...</Texts>
          </View>
        )}
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
