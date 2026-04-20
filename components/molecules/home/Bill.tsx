import { Texts } from "@/components/atoms";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  item: Item;
  type: "late" | "upcoming";
  formatDate: (d: string) => string;
};
type Item = {
  nama: string;
  jatuhTempo: string;
  noPinjaman: string;
  cicilanKe: string;
  status?: "Terlambat" | "Lunas";
};
export const Bill = ({ item, type, formatDate }: Props) => {
  const isLate = type === "late";

  return (
    <TouchableOpacity
      style={cardItem}
      onPress={() =>
        router.push({
          pathname: "/tagihan/detailTagihan",
          params: item,
        })
      }
    >
      {/* AVATAR */}
      <View
        style={[avatar, { backgroundColor: isLate ? "#FEE2E2" : "#DBEAFE" }]}
      >
        <Texts color={isLate ? "#991B1B" : "#1E3A8A"} weight="bold">
          {item.nama.slice(0, 2).toUpperCase()}
        </Texts>
      </View>

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Texts color="#111827" weight="semiBold">
          {item.noPinjaman}
        </Texts>
        <Texts color="#6B7280">
          {item.nama} • Angsuran ke - {item.cicilanKe}
        </Texts>
      </View>

      {/* DATE */}
      <View
        style={[dateBox, { backgroundColor: isLate ? "#FEE2E2" : "#E0F2FE" }]}
      >
        <Texts color={isLate ? "#B91C1C" : "#0369A1"}>
          {formatDate(item.jatuhTempo)}
        </Texts>
      </View>
    </TouchableOpacity>
  );
};

const cardItem: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFF",
  padding: 12,
  borderRadius: 12,
  alignItems: "center",
  gap: 10,
  elevation: 2,
};

const avatar: ViewStyle = {
  height: 45,
  width: 45,
  borderRadius: 22,
  alignItems: "center",
  justifyContent: "center",
};

const dateBox: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
};
