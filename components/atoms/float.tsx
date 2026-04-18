import { fonts, verticalScale } from "@/utils";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { ExpoIconProps, Icons } from "./Icons";
import { Texts } from "./Texts";

type Props = {
  onFloat: () => void;
  title: string;
  icon: String;
  iconType?: ExpoIconProps["type"];
};

export const Float = ({
  onFloat,
  title,
  icon,
  iconType = "Feather",
}: Props) => {
  return (
    <TouchableOpacity onPress={onFloat} style={fab}>
      <Icons
        type={iconType}
        name={icon}
        size={fonts.size.font16}
        color="#FFF"
      />
      <Texts color="#FFF" weight="semiBold">
        {title}
      </Texts>
    </TouchableOpacity>
  );
};

const fab: ViewStyle = {
  position: "absolute",
  bottom: verticalScale(14),
  left: verticalScale(14),
  right: verticalScale(14),
  backgroundColor: "#111827",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: verticalScale(12),
  borderRadius: 12,
  gap: 10,
};
