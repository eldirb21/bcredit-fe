import { ActionButton, InfoCard } from "@/components/molecules";
import { axiosInstance, formatDate, formatRupiah, isSameToday } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
  noPinjaman?: string;
};

export default function DetailTagihan() {
  const params = useLocalSearchParams<TagihanParams>();

  const [data, setdata] = useState(params);
  const [angsurans, setAngsurans] = useState([]);

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

  useEffect(() => {
    loadInitial();
  }, []);

  const loadInitial = async () => {
    try {
      const result = await axiosInstance.get(`angsuran/${data?._id}`);
      setAngsurans(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerPayment = (item: {
    nominal: number;
    status: string;
    angsuran: number;
  }) => {
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
              {data?.nama || "-"}
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
              No. Angota: {data?.anggota || ""}
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
              No. Pinjaman: {data?.noPinjaman || "-"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <InfoCard
              label="Pokok Pinjaman"
              value={formatRupiah(data?.pinjamanPokok)}
            />
            <InfoCard
              label="Angsuran/minggu"
              value={formatRupiah(data?.angsuranNominal)}
              color="#60A5FA"
            />
            <InfoCard
              label="Ansuran"
              value={data?.tenor + " " + data?.tipeAngsuran}
            />
            <InfoCard
              label="Sisa Tagihan"
              value={formatRupiah(
                (Number(data?.tenor) - Number(data?.angsuranKeTerakhir)) *
                  Number(data?.angsuranNominal),
              )}
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
              {angsurans.map((item, index) => {
                const s = getStatus(item.status);

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={
                      item.status === "lunas" || !isSameToday(item?.jatuhTempo)
                    }
                    onPress={() => handlerPayment(item)}
                    key={index}
                    style={[
                      itemRow,
                      {
                        backgroundColor: isSameToday(item?.jatuhTempo)
                          ? "#17ce5119"
                          : item.status === "terlambat"
                            ? s.bg
                            : "#FFF",
                      },
                    ]}
                  >
                    {/* INDEX */}
                    <View
                      style={[
                        indexCircle,
                        {
                          backgroundColor: isSameToday(item?.jatuhTempo)
                            ? "#17ce5133"
                            : s.bg || "#E5E7EB",
                        },
                      ]}
                    >
                      <Text style={{ fontWeight: "700", color: s.color }}>
                        {item?.angsuranKe}
                      </Text>
                    </View>

                    {/* INFO */}
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text
                        style={{
                          fontWeight: "600",
                          color: isSameToday(item?.jatuhTempo)
                            ? "green"
                            : s.color,
                        }}
                      >
                        {formatDate(item?.jatuhTempo)}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
                        {item.status === "terlambat"
                          ? "Belum bayar • +14 hari"
                          : item.status === "lunas"
                            ? "Lunas"
                            : "Jatuh tempo: 15 Mei 2026"}
                      </Text>
                    </View>

                    {/* RIGHT */}
                    <View style={{ alignItems: "flex-end", gap: 4 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: isSameToday(item?.jatuhTempo)
                            ? "green"
                            : s.color,
                        }}
                      >
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
        </ScrollView>
      </View>

      {/* ACTION BUTTON */}
      <View style={{ flexDirection: "row", margin: 8, gap: 8 }}>
        <ActionButton icon="share" label="Bayar Cepat" />
        {/* <ActionButton
          icon="printer"
          label="Print"
          dark
          onPress={() => router.push("/tagihan/ThermalReceipt")}
        /> */}
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
