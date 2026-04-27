import { axiosInstance } from "@/utils";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AngsuranScreen({ route }: any) {
  const { pinjamanId } = route.params;

  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAngsuran();
  }, []);

  const fetchAngsuran = async () => {
    const res = await axiosInstance.get(`angsuran/${pinjamanId}`);
    setData(res.data);
  };

  // 🔥 toggle checkbox
  const toggleSelect = (item: any) => {
    if (item.dibayar) return;

    if (selected.includes(item._id)) {
      setSelected(selected.filter((id) => id !== item._id));
    } else {
      setSelected([...selected, item._id]);
    }
  };

  // 🔥 hitung total
  const totalBayar = data
    .filter((item) => selected.includes(item._id))
    .reduce((acc, cur) => acc + cur.nominal, 0);

  // 🔥 bayar manual
  const handleBayarManual = async () => {
    if (selected.length === 0) return;

    setLoading(true);

    await axiosInstance.post(`angsuran/bayar-bulk`, {
      angsuranIds: selected,
    });

    setSelected([]);
    fetchAngsuran();
    setLoading(false);
  };

  // 🔥 bayar cepat (1x, 5x, lunas)
  const handleQuickPay = async (type: "1x" | "5x" | "lunas") => {
    setLoading(true);

    let body: any = { pinjamanId };

    if (type === "1x") body.jumlahBayar = 1;
    if (type === "5x") body.jumlahBayar = 5;
    if (type === "lunas") body.lunas = true;

    await axiosInstance.post(`angsuran/bayar-bulk`, body);

    fetchAngsuran();
    setSelected([]);
    setLoading(false);
  };

  // 🔥 render item
  const renderItem = ({ item }: any) => {
    const isChecked = selected.includes(item._id);

    return (
      <TouchableOpacity
        style={[styles.item, item.dibayar && styles.itemPaid]}
        onPress={() => toggleSelect(item)}
      >
        {/* checkbox */}
        <View style={[styles.checkbox, isChecked && styles.checkboxActive]} />

        {/* info */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Angsuran ke-{item.angsuranKe}</Text>
          <Text style={styles.nominal}>Rp {item.nominal.toLocaleString()}</Text>
        </View>

        {/* status */}
        <Text style={styles.status}>{item.dibayar ? "✔ Lunas" : "Belum"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Angsuran</Text>

      {/* 🔥 tombol cepat */}
      <View style={styles.quickRow}>
        <Btn label="1x" onPress={() => handleQuickPay("1x")} />
        <Btn label="5x" onPress={() => handleQuickPay("5x")} />
        <Btn label="Lunas" onPress={() => handleQuickPay("lunas")} />
      </View>

      {/* 🔥 list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      {/* 🔥 footer bayar */}
      <View style={styles.footer}>
        <Text>Total: Rp {totalBayar.toLocaleString()}</Text>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={handleBayarManual}
          disabled={loading}
        >
          <Text style={{ color: "#fff" }}>Bayar ({selected.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🔥 tombol kecil
const Btn = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.quickBtn} onPress={onPress}>
    <Text style={{ color: "#fff" }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  item: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  itemPaid: {
    backgroundColor: "#d8f3dc",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: "green",
  },

  title: { fontWeight: "bold" },

  nominal: { color: "#555" },

  status: { fontSize: 12 },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
  },

  payBtn: {
    backgroundColor: "#0077b6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  quickBtn: {
    flex: 1,
    backgroundColor: "#0096c7",
    padding: 10,
    marginHorizontal: 4,
    alignItems: "center",
    borderRadius: 6,
  },
});
