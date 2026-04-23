import { Float } from "@/components/atoms";
import { axiosInstance } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Customer = {
  _id: string;
  nama: string;
  phone: string;
  anggota: string;
};

export default function CustomerList() {
  const [data, setData] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter(
      (x) =>
        x.nama.toLowerCase().includes(search.toLowerCase()) ||
        x.anggota.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  const handleDelete = (id: string) => {
    Alert.alert("Hapus Nasabah", "Yakin mau hapus?", [
      { text: "Batal" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => handleSubmitDelete(id),
      },
    ]);
  };

  const handleSubmitDelete = async (id: string) => {
    try {
      const result = await axiosInstance.delete(`api/nasabah/${id}`);
      console.log("DATA:", result.data?.success);
      console.log("DATA:", result.data?.message);
      fetchData();
    } catch (error) {
      console.log("DATA error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("api/nasabah");
      setData(result.data.data);
      router.replace("/(tabs)/customer");
    } catch (error) {
      console.log("DATA error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Data Nasabah</Text>

        <TouchableOpacity
          onPress={() => router.push("/customers/add")}
          style={styles.addBtn}
        >
          <Icons name="plus" color="#FFF" size={16} />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Icons name="search" size={16} color="#9CA3AF" />
        <TextInput
          placeholder="Cari nama / nomor pinjaman"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item?._id?.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <CustomerItem
            key={String(item?._id + index)}
            onDetail={() =>
              router.push({
                pathname: "/customers/detail",
                params: item,
              })
            }
            item={item}
            onEdit={() =>
              router.push({
                pathname: "/customers/edit",
                params: { id: item._id },
              })
            }
            onDelete={() => handleDelete(item._id)}
          />
        )}
      />
      <Float
        onFloat={() => router.push("/customers/ajukanPinjaman")}
        title="Pinjaman Baru"
        icon="plus"
      />
    </SafeAreaView>
  );
}

/* ITEM */
const CustomerItem = ({
  item,
  onEdit,
  onDelete,
  onDetail,
}: {
  item: Customer;
  onEdit: () => void;
  onDelete: () => void;
  onDetail: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onDetail}>
      <View style={styles.avatar}>
        <Text style={{ fontWeight: "700" }}>
          {item.nama.slice(0, 2).toUpperCase()}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.nama}</Text>
        <Text style={styles.sub}>
          {item.anggota} • {item.phone}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={onEdit}>
          <Icons name="edit-2" size={18} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Icons name="trash" size={18} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  title: { fontSize: 16, fontWeight: "700" },

  addBtn: {
    backgroundColor: "#111827",
    padding: 8,
    borderRadius: 8,
  },

  searchBox: {
    marginHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  name: { fontWeight: "600" },
  sub: { fontSize: 12, color: "#6B7280" },
});
