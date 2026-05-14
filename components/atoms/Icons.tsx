import {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
} from "@expo/vector-icons";
import React, { ComponentProps, ComponentType } from "react";
import {
    Image,
    ImageStyle,
    StyleProp,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewProps,
    ViewStyle,
} from "react-native";

const colors = {
  textGrey: "#999",
};

export const iconRegistry = {
  //   bell: require("@/assets/icons/bell.png"),
} as const;

const combinedIconRegistry = iconRegistry;

export type IconTypes = keyof typeof combinedIconRegistry;

export interface IconImageProps extends Omit<TouchableOpacityProps, "style"> {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps["onPress"];
}
type AllIconProps =
  | ComponentProps<typeof AntDesign>
  | ComponentProps<typeof Entypo>
  | ComponentProps<typeof EvilIcons>
  | ComponentProps<typeof Feather>
  | ComponentProps<typeof FontAwesome>
  | ComponentProps<typeof FontAwesome5>
  | ComponentProps<typeof Fontisto>
  | ComponentProps<typeof Foundation>
  | ComponentProps<typeof Ionicons>
  | ComponentProps<typeof MaterialCommunityIcons>
  | ComponentProps<typeof MaterialIcons>
  | ComponentProps<typeof Octicons>
  | ComponentProps<typeof SimpleLineIcons>
  | ComponentProps<typeof Zocial>;
export interface ExpoIconProps extends AllIconProps {
  type:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "FontAwesome5"
    | "Fontisto"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "Zocial";
}

export const iconExpo = (
  type: ExpoIconProps["type"],
  props: any,
  color?: string,
) => {
  const commonProps = { ...props, color: color || colors.textGrey };
  switch (type) {
    case "AntDesign":
      return <AntDesign {...commonProps} />;
    case "Feather":
      return <Feather {...commonProps} />;
    case "Entypo":
      return <Entypo {...commonProps} />;
    case "FontAwesome":
      return <FontAwesome {...commonProps} />;
    case "FontAwesome5":
      return <FontAwesome5 {...commonProps} />;
    case "Fontisto":
      return <Fontisto {...commonProps} />;
    case "EvilIcons":
      return <EvilIcons {...commonProps} />;
    case "Foundation":
      return <Foundation {...commonProps} />;
    case "Octicons":
      return <Octicons {...commonProps} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons {...commonProps} />;
    case "Ionicons":
      return <Ionicons {...commonProps} />;
    case "SimpleLineIcons":
      return <SimpleLineIcons {...commonProps} />;
    case "Zocial":
      return <Zocial {...commonProps} />;
    default:
      return <MaterialIcons {...commonProps} />;
  }
};

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
};

export const Icons = (props: IconImageProps | ExpoIconProps) => {
  if ("icon" in props) {
    const {
      icon,
      color,
      size,
      style: $imageStyleOverride,
      containerStyle: $containerStyleOverride,
      ...WrapperProps
    } = props;

    const isPressable = !!WrapperProps.onPress;
    const Wrapper = (
      WrapperProps?.onPress ? TouchableOpacity : View
    ) as ComponentType<TouchableOpacityProps | ViewProps>;

    const $imageStyle: StyleProp<ImageStyle> = [
      $imageStyleBase,
      color !== undefined && { tintColor: color },
      size !== undefined && { width: size, height: size },
      $imageStyleOverride,
    ];

    return (
      <Wrapper
        accessibilityRole={isPressable ? "imagebutton" : undefined}
        {...WrapperProps}
        style={$containerStyleOverride}
      >
        <Image
          style={$imageStyle}
          source={combinedIconRegistry[icon as IconTypes]}
        />
      </Wrapper>
    );
  }

  if ("type" in props && "name" in props) {
    const { type, name, size, style, color, ...restProps } = props;

    const safeColor = typeof color === "string" ? color : undefined;

    return iconExpo(type, { name, size, style, ...restProps }, safeColor);
  }

  return null;
};
