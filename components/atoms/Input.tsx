import React from "react";
import {
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import { Texts } from "./Texts";

type Props = {
  label?: string;
  value: string;
  onChange: (text: string) => void;

  keyboardType?: TextInputProps["keyboardType"];
  multiline?: boolean;
  editable?: boolean;
  placeholder?: string;

  error?: string;
  containerStyle?: ViewStyle;
};

export const Input = ({
  label,
  value,
  onChange,
  keyboardType = "default",
  multiline = false,
  editable = true,
  placeholder,
  error,
  containerStyle,
}: Props) => {
  return (
    <View style={[{ gap: 4 }, containerStyle]}>
      {/* LABEL */}
      {label && (
        <Texts weight="semiBold" color="#9CA3AF">
          {label}
        </Texts>
      )}

      {/* INPUT */}
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
        editable={editable}
        placeholder={placeholder || `Masukkan ${label || ""}`}
        placeholderTextColor="#9CA3AF"
        style={[
          inputText,
          multiline && { height: 90, textAlignVertical: "top" },
          !editable && { backgroundColor: "#F3F4F6" },
          error && { borderColor: "#EF4444" },
        ]}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {/* ERROR */}
      {error && (
        <Texts color="#EF4444" style={errorText}>
          {error}
        </Texts>
      )}
    </View>
  );
};

const inputText: TextStyle = {
  backgroundColor: "#FFF",
  paddingHorizontal: 12,
  paddingVertical: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  fontSize: 14,
};

const errorText: TextStyle = {
  fontSize: 11,
  marginTop: 2,
};
