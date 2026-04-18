import { Icons, Texts } from "@/components/atoms";
import { fonts, getCurrentMonthYear, verticalScale } from "@/utils";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = { lateData: number; onSearch: () => void };

export const Header = ({ lateData, onSearch }: Props) => {
  const currentMonth = getCurrentMonthYear();
  const area = "Jakarta";
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Texts color="#FFF" size={fonts.size.font12} weight="bold">
            Daftar Tagihan
          </Texts>
          <Texts color="#9CA3AF">
            Area {area}• {currentMonth}
          </Texts>
        </View>

        <View style={styles.badge}>
          <Texts color="#FFF">{lateData} Terlambat</Texts>
        </View>
      </View>

      {/* SEARCH */}
      <TouchableOpacity style={styles.searchBox} onPress={onSearch}>
        <Icons
          type="Feather"
          name="search"
          size={fonts.size.font16}
          color={"#9CA3AF"}
        />
        <Texts color="#9CA3AF">Cari nama / no kontrak</Texts>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },
  container: { paddingBottom: verticalScale(120) },

  header: {
    backgroundColor: "#1F2937",
    padding: verticalScale(16),
    borderBottomLeftRadius: verticalScale(20),
    borderBottomRightRadius: verticalScale(20),
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    backgroundColor: "#DC2626",
    paddingHorizontal: verticalScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: verticalScale(20),
  },

  searchBox: {
    marginTop: verticalScale(12),
    backgroundColor: "#374151",
    flexDirection: "row",
    alignItems: "center",
    padding: verticalScale(10),
    borderRadius: verticalScale(10),
    gap: verticalScale(8),
  },
});
