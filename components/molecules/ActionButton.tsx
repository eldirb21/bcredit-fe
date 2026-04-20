import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Icons } from "../atoms";

type Props = {
  icon: any;
  label: string;
  dark?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const ActionButton = ({
  icon,
  label,
  dark,
  disabled,
  onPress,
}: Props) => {
  const bgColor = disabled
    ? "#D1D5DB" // abu disabled
    : dark
      ? "#000"
      : "#FFF";

  const textColor = disabled ? "#9CA3AF" : dark ? "#FFF" : "#000";

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 12,
        borderRadius: 12,
        backgroundColor: bgColor,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <Icons type="Feather" name={icon} size={18} color={textColor} />
      <Text
        style={{
          color: textColor,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
