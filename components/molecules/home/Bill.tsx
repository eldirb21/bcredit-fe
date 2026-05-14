import { Texts } from "@/components/atoms";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  item: Item;
  type: "late" | "scheduled" | "paid";
  formatDate: (d: string) => string;
};

type Item = {
  nama: string;
  jatuhTempoBerikutnya: string;
  noPinjaman: string;
  angsuranKeTerakhir: number;
  status?: "lunas" | "terlambat" | "aktif";
};

// 🔥 STYLE MAPPING
const TYPE_STYLE = {
  late: {
    avatarBg: "#FEE2E2",
    avatarText: "#991B1B",
    dateBg: "#FEE2E2",
    dateText: "#B91C1C",
  },
  scheduled: {
    avatarBg: "#E0F2FE",
    avatarText: "#075985",
    dateBg: "#E0F2FE",
    dateText: "#0369A1",
  },
  paid: {
    avatarBg: "#DCFCE7",
    avatarText: "#166534",
    dateBg: "#DCFCE7",
    dateText: "#15803D",
  },
};

export const Bill = ({ item, type, formatDate }: Props) => {
  const style = TYPE_STYLE[type];

  return (
    <TouchableOpacity
      style={cardItem}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/tagihan/detailTagihan",
          params: item,
        })
      }
    >
      {/* AVATAR */}
      <View style={[avatar, { backgroundColor: style.avatarBg }]}>
        <Texts color={style.avatarText} weight="bold">
          {item?.nama?.slice(0, 2).toUpperCase()}
        </Texts>
      </View>

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Texts color="#111827" weight="semiBold">
          {item.noPinjaman}
        </Texts>
        <Texts color="#6B7280">
          {item?.nama} • Angsuran ke - {item.angsuranKeTerakhir}
        </Texts>
      </View>

      {/* DATE */}
      <View style={[dateBox, { backgroundColor: style.dateBg }]}>
        <Texts color={style.dateText}>
          {formatDate(item.jatuhTempoBerikutnya)}
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
