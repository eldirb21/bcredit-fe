import { Icons, Texts } from "@/components/atoms";
import { fonts, verticalScale } from "@/utils";
import React, { ReactNode } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export const Section = ({ title, open, onToggle, children }: Props) => {
  return (
    <View style={{ marginBottom: verticalScale(12) }}>
      <TouchableOpacity onPress={onToggle} style={sectionHeader}>
        <Texts weight="bold" color="#6B7280">
          {title}
        </Texts>
        <Icons
          type="Feather"
          name={open ? "chevron-up" : "chevron-right"}
          size={fonts.size.font20}
          color={"#6B7280"}
        />
      </TouchableOpacity>

      {open && <View style={{ gap: 10 }}>{children}</View>}
    </View>
  );
};

const sectionHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: verticalScale(8),
};
