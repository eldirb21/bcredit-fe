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
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SessionKey = "late" | "scheduled" | "paid";

type Item = {
  nama: string;
  jatuhTempoBerikutnya: string;
  noPinjaman: string;
  cicilanKe: string;
  angsuranKeTerakhir: number;
  status?: "lunas" | "terlambat" | "aktif";
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
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔄 REFRESH
  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setPage(1);
      setRefreshing(false);
    }, 1000);
  };

  // ⬇️ LOAD MORE
  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);
  };

  // 🔥 FILTER BERDASARKAN TAB
  const filteredData = useMemo(() => {
    console.log(data);

    if (tabSelected === "Terlambat") {
      return data.filter((x) => x.status === "terlambat");
    }
    if (tabSelected === "Lunas") {
      return data.filter((x) => x.status === "lunas");
    }
    if (tabSelected === "Terjadwal") {
      return data.filter((x) => x.status === "aktif");
    }
    return data;
  }, [tabSelected, data]);

  // 🔥 GROUPING
  const lateData = filteredData.filter((x) => x.status === "terlambat");
  const scheduledData = filteredData.filter((x) => x.status === "aktif");
  const paidData = filteredData.filter((x) => x.status === "lunas");

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
    <SafeAreaView style={safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView
        contentContainerStyle={container}
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

        <View style={content}>
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

const safe: ViewStyle = {
  flex: 1,
  backgroundColor: "#F5F6FA",
};
const container: ViewStyle = {
  paddingBottom: verticalScale(120),
};
const content: ViewStyle = {
  padding: verticalScale(16),
};
