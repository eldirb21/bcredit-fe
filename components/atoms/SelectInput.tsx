import Icons from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onSelect: (val: string) => void;
  placeholder?: string;
  error?: string;
};

export const SelectInput = ({
  label,
  value,
  options,
  onSelect,
  placeholder = "Pilih metode",
  error,
}: Props) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: "#9CA3AF", fontSize: 14, fontWeight: "700" }}>
        {label}
      </Text>

      {/* INPUT */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
        style={{
          backgroundColor: "#000",
          borderRadius: 20,
          paddingHorizontal: 12,
          height: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: selected ? "#FFF" : "#9CA3AF" }}>
          {selected ? selected.label : placeholder}
        </Text>
        <Icons name={open ? "chevron-up" : "chevron-down"} color="#FFF" />
      </TouchableOpacity>

      {/* DROPDOWN */}
      {open && (
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 6,
          }}
        >
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                onSelect(item.value);
                setOpen(false);
              }}
              style={{
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#FFF" }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ERROR */}
      {error && <Text style={{ color: "#ef4444", fontSize: 12 }}>{error}</Text>}
    </View>
  );
};
