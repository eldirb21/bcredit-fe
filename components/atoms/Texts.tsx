import { Colors } from "@/constants/theme";
import { fonts } from "@/utils";
import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type FontWeight = "regular" | "medium" | "semiBold" | "bold" | "light" | "thin";

interface Props extends TextProps {
  size?: number;
  color?: string;
  weight?: FontWeight;
  center?: boolean;
  uppercase?: boolean;
  style?: TextStyle | TextStyle[];
}

const fontMapping: Record<FontWeight, string> = {
  regular: fonts.type.poppinsRegular,
  medium: fonts.type.poppinsMedium,
  semiBold: fonts.type.poppinsSemiBold,
  bold: fonts.type.poppinsBold,
  light: fonts.type.poppinsLight,
  thin: fonts.type.poppinsThin,
};

export const Texts: React.FC<Props> = ({
  size = fonts.size.font12,
  color = Colors.light.textDefault,
  weight = "regular",
  center = false,
  uppercase = false,
  style,
  children,
  ...rest
}) => {
  const textStyles: TextStyle[] = [
    styles.textDefault,
    { fontSize: size },
    { color },
    { fontFamily: fontMapping[weight] },
    center ? { textAlign: "center" } : {},
    uppercase ? { textTransform: "uppercase" } : {},
    ...((Array.isArray(style) ? style : [style]).filter(
      Boolean,
    ) as TextStyle[]),
  ];

  const flattenedStyle = Array.isArray(style) ? style : [style];

  return (
    <Text {...rest} style={[...textStyles, ...flattenedStyle]}>
      {typeof children === "string" && uppercase
        ? children.toUpperCase()
        : children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textDefault: {
    color: Colors.light.textDefault,
    fontSize: fonts.size.font12,
    fontFamily: fonts.type.poppinsRegular,
  },
});
