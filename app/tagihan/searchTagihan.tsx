"use client";

import { Texts } from "@/components/atoms";
import { Bill } from "@/components/molecules/home";
import { axiosInstance } from "@/utils";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TextInput, View } from "react-native";

export default function SearchTagihan() {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounce(query);
    }, 400);

    return () => clearTimeout(t);
  }, [query]);

  // 🔥 API CALL
  useEffect(() => {
    if (!debounce) {
      setData([]); // kosongkan kalau tidak ada query
      return;
    }

    fetchSearch();
  }, [debounce]);

  const fetchSearch = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/search", {
        params: {
          q: debounce,
          page: 1,
          limit: 10,
        },
      });

      setData(res.data.data);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("id-ID");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* INPUT */}
      <TextInput
        placeholder="Cari nama / pinjaman..."
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: "#FFF",
          padding: 12,
          borderRadius: 10,
        }}
      />

      {/* LOADING */}
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {/* RESULT */}
      <FlatList
        data={data}
        keyExtractor={(item: any) => item._id}
        ListEmptyComponent={
          !loading && (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <BillEmpty query={debounce} />
            </View>
          )
        }
        renderItem={({ item }) => (
          <Bill
            item={item}
            type={
              item.status === "Terlambat"
                ? "late"
                : item.status === "Lunas"
                  ? "paid"
                  : "scheduled"
            }
            formatDate={formatDate}
          />
        )}
      />
    </View>
  );
}

/* EMPTY STATE */
const BillEmpty = ({ query }: { query: string }) => {
  return (
    <View>
      <Texts color="#9CA3AF">
        {query ? "Data tidak ditemukan" : "Mulai mencari..."}
      </Texts>
    </View>
  );
};
