import { ActionButton, InfoCard } from "@/components/molecules";
import { formatRupiah } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TagihanParams = {
  nama?: string;
  noPelanggan?: string;
};

export default function DetailTagihan() {
  const params = useLocalSearchParams<TagihanParams>();

  const angsuran = [
    { status: "Lunas", nominal: 2250000 },
    { status: "Terlambat", nominal: 2250000 },
    { status: "Terjadwal", nominal: 2250000 },
    { status: "Lunas", nominal: 2250000 },
    { status: "Terlambat", nominal: 2250000 },
    { status: "Terjadwal", nominal: 2250000 },
  ];

  const getStatus = (status: string) => {
    if (status === "Lunas")
      return {
        color: "#10B981",
        bg: "rgba(16,185,129,0.15)",
        icon: "check-circle",
      };

    if (status === "Terlambat")
      return {
        color: "#F59E0B",
        bg: "#FEF3C7",
        icon: "alert-triangle",
      };

    return {
      color: "#6B7280",
      bg: "#FFF",
      icon: null,
    };
  };

  const handlerPayment = (item: { nominal: string; status: "String" }) => {
    router.push("/tagihan/payment");
    console.log(item);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#e3e3e3" />

      <View style={{ flex: 1, margin: 8 }}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: "#1F2937",
            borderRadius: 12,
            padding: 16,
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "rgba(255,255,255,0.1)",
              alignSelf: "flex-start",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
            }}
          >
            <Icons name="arrow-left" color="#FFF" size={18} />
            <Text style={{ color: "#FFF" }}>Kembali</Text>
          </TouchableOpacity>

          <View>
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>
              {params.nama || "-"}
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
              No. Kontrak: {params.noPelanggan || "-"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <InfoCard label="Pokok Pinjaman" value={formatRupiah(30000000)} />
            <InfoCard
              label="Angsuran/bulan"
              value={formatRupiah(2250000)}
              color="#60A5FA"
            />
            <InfoCard label="Tenor" value="24 bulan" />
            <InfoCard
              label="Sisa Tagihan"
              value={formatRupiah(27000000)}
              color="#EF4444"
            />
          </View>
        </View>

        {/* CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, gap: 12, marginTop: 12 }}
        >
          {/* KARTU ANGSURAN */}
          <View>
            <Text style={sectionTitle}>KARTU ANGSURAN</Text>

            <View style={cardContainer}>
              {angsuran.map((item, index) => {
                const s = getStatus(item.status);

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handlerPayment(item)}
                    key={index}
                    style={[
                      itemRow,
                      {
                        backgroundColor:
                          item.status === "Terlambat" ? s.bg : "#FFF",
                      },
                    ]}
                  >
                    {/* INDEX */}
                    <View
                      style={[
                        indexCircle,
                        { backgroundColor: s.bg || "#E5E7EB" },
                      ]}
                    >
                      <Text style={{ fontWeight: "700", color: s.color }}>
                        {index + 1}
                      </Text>
                    </View>

                    {/* INFO */}
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={{ fontWeight: "600", color: s.color }}>
                        April 2026
                      </Text>
                      <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
                        {item.status === "Terlambat"
                          ? "Belum bayar • +14 hari"
                          : item.status === "Lunas"
                            ? "Lunas"
                            : "Jatuh tempo: 15 Mei 2026"}
                      </Text>
                    </View>

                    {/* RIGHT */}
                    <View style={{ alignItems: "flex-end", gap: 4 }}>
                      <Text style={{ fontWeight: "700", color: s.color }}>
                        {formatRupiah(item.nominal)}
                      </Text>

                      {s.icon && (
                        <Icons name={s.icon as any} size={16} color={s.color} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* TANDA TERIMA */}
          <View style={receiptContainer}>
            <Text style={sectionTitle}>TANDA TERIMA PEMBAYARAN</Text>

            <View style={{ marginTop: 6, gap: 6 }}>
              <Row label="Jumlah diterima" value={formatRupiah(2250000)} />
              <Row label="Diterima oleh" value="Ahmad (Kolektor)" />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* ACTION BUTTON */}
      <View style={{ flexDirection: "row", margin: 8, gap: 8 }}>
        <ActionButton icon="share" label="Bagikan" />
        <ActionButton icon="printer" label="Print" dark />
      </View>
    </SafeAreaView>
  );
}

/* 🔥 COMPONENT KECIL */
const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={{ color: "#6B7280", fontSize: 13 }}>{label}</Text>
    {/* <Text style={{ fontWeight: "600" }}>{value}</Text> */}
  </View>
);

/* 🔥 STYLES */
const sectionTitle: TextStyle = {
  fontSize: 13,
  fontWeight: "700",
  color: "#6B7280",
};

const cardContainer = {
  backgroundColor: "#FFF",
  borderRadius: 12,
};

const itemRow = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  padding: 12,
  borderBottomWidth: 1,
  borderColor: "#F3F4F6",
};

const indexCircle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

const receiptContainer = {
  backgroundColor: "#FFF",
  padding: 12,
  borderRadius: 12,
  gap: 8,
};
