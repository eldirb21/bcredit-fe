import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: Date;
  onChangeDate: (date: Date) => void;
  type: "date" | "time" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock";
  placeholder?: string;
};

export const DateTimes = ({
  value,
  onChangeDate,
  type,
  display = "default",
  placeholder,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);

    if (event.type === "dismissed") return;
    if (selectedDate) onChangeDate(selectedDate);
  };

  const formatValue = () => {
    if (!value) return placeholder || "Pilih";

    if (type === "time") {
      return value.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return value.toLocaleDateString("id-ID");
  };

  return (
    <View>
      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "#000",
          borderRadius: 20,
          height: 45,
          paddingHorizontal: 12,
          justifyContent: "center",
        }}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: "#FFF" }}>{formatValue()}</Text>
      </TouchableOpacity>

      {/* PICKER */}
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={type}
          display={display}
          onChange={handleChange}
        />
      )}
    </View>
  );
};
