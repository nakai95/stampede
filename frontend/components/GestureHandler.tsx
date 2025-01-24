import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface GestureHandlerProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  size: number;
}

export const GestureHandler = ({ x, y, size }: GestureHandlerProps) => {
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: size,
    height: size,
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
  // The gesture handler for the ball
  const gesture = Gesture.Pan().onChange((e) => {
    x.value += e.x;
    y.value += e.y;
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
