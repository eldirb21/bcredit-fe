import React from "react";
import { Text, View } from "react-native";

type Props = {
  label: string;
  color?: string;
  value: string | number;
};

export const InfoCard = ({ label, value, color = "#FFF" }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(199, 199, 199, 0.31)",
        padding: 12,
        borderRadius: 12,
        width: "48%",
      }}
    >
      <Text style={{ color: "#b4b4b4", fontSize: 13 }}>{label}</Text>
      <Text style={{ color, fontSize: 16, fontWeight: "700" }}>{value}</Text>
    </View>
  );
};
