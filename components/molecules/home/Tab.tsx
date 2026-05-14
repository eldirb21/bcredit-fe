import { Texts } from "@/components/atoms";
import { verticalScale } from "@/utils";
import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  tabs: string[];
  tabSelected: string;
  setTabSelected: (key: string) => void;
};

export const Tab = ({ tabs, tabSelected, setTabSelected }: Props) => {
  const useSetTab = (key: string) => setTabSelected(key);

  return (
    <View style={tabWrap}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => useSetTab(tab)}
          style={[tabItem, tabSelected === tab && tabActive]}
        >
          <Texts weight="bold" color={tabSelected === tab ? "#FFF" : "#6B7280"}>
            {tab}
          </Texts>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const tabWrap: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  marginBottom: verticalScale(12),
};

const tabItem: ViewStyle = {
  flex: 1,
  padding: 10,
  backgroundColor: "#FFF",
  borderRadius: 10,
  alignItems: "center",
};

const tabActive: ViewStyle = {
  backgroundColor: "#111827",
};
