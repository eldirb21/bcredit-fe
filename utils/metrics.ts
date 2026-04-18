import { Dimensions } from "react-native";

// Getting the width and height of the device's screen
const { width, height } = Dimensions.get("window");

// Reference sizes for scaling, you can adjust based on the device you use as the baseline
const guidelineBaseWidth = 375; // Width of iPhone 11
const guidelineBaseHeight = 812; // Height of iPhone 11

// Function to calculate scaling based on screen width
export const scale = (size: number): number =>
  (width / guidelineBaseWidth) * size;

// Function to calculate vertical scaling based on screen height
export const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

// Function for moderate scaling, can be adjusted with a factor (default 0.5)
export const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

// Device screen dimensions
export const SCREEN_WIDTH: number = width;
export const SCREEN_HEIGHT: number = height;

// Determines if the device is a tablet based on screen width
export const isTablet: boolean = width >= 768;

/** -------------- FONT ------------- */
// Define font sizes using moderate scaling
const size = {
  font6: moderateScale(6),
  font8: moderateScale(8),
  font10: moderateScale(10),
  font12: moderateScale(12),
  font14: moderateScale(14),
  font16: moderateScale(16),
  font18: moderateScale(18),
  font20: moderateScale(20),
  font22: moderateScale(22),
  font24: moderateScale(24),
  font26: moderateScale(26),
  font28: moderateScale(28),
  font30: moderateScale(30),
};

// Define font weights
const weight = {
  full: "900",
  semi: "600",
  low: "400",
  bold: "bold",
  normal: "normal",
};

// Define font family types
const type = {
  poppinsRegular: "poppins-regular",
  poppinsMedium: "poppins-medium",
  poppinsSemiBold: "poppins-semiBold",
  poppinsBold: "poppins-bold",
  poppinsLight: "",
  poppinsThin: "",
};

export const fonts = { size, weight, type };
