import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export function useLoginAnimation() {
  // Shared Values
  const bgOpacity = useSharedValue(0)

  const circle1Y = useSharedValue(-200)
  const circle2Y = useSharedValue(200)

  const headerY = useSharedValue(-40)
  const headerOpacity = useSharedValue(0)

  const logoScale = useSharedValue(0)
  const logoOpacity = useSharedValue(0)

  const formTranslateY = useSharedValue(60)
  const formOpacity = useSharedValue(0)

  const buttonScale = useSharedValue(1)

  // Start Animation
  useEffect(() => {
    bgOpacity.value = withTiming(1, {
      duration: 600,
    })

    circle1Y.value = withDelay(
      100,
      withSpring(0, {
        damping: 15,
      }),
    )

    circle2Y.value = withDelay(
      200,
      withSpring(0, {
        damping: 15,
      }),
    )

    logoScale.value = withDelay(
      300,
      withSpring(1, {
        damping: 12,
      }),
    )
    headerY.value = withDelay(200, withSpring(0, { damping: 14 }))
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 400 }))

    logoOpacity.value = withDelay(
      300,
      withTiming(1, {
        duration: 400,
      }),
    )

    formTranslateY.value = withDelay(
      500,
      withSpring(0, {
        damping: 16,
        stiffness: 100,
      }),
    )

    formOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
      }),
    )
  }, [])

  // Animated Styles
  const bgStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }))

  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: circle1Y.value }],
  }))

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: circle2Y.value }],
  }))

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }))
  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }],
    opacity: headerOpacity.value,
  }))

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }))

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  // Button Press Animation
  const animateButtonPress = () => {
    buttonScale.value = withSequence(
      withTiming(0.94, {
        duration: 80,
      }),
      withSpring(1),
    )
  }

  return {
    bgStyle,
    circle1Style,
    circle2Style,
    logoStyle,
    formStyle,
    buttonStyle,
    animateButtonPress,
    headerStyle,
  }
}
