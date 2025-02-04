import { useCallback, useState } from "react";
import { TextInput } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface GestureHandlerProps {
  fontSize: number;
  length: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  text: SharedValue<string>;
}

export const InputGestureHandler = ({
  fontSize,
  length,
  x,
  y,
  text,
}: GestureHandlerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: fontSize * length,
    height: fontSize,
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
  // The gesture handler for the ball
  const gesture = Gesture.Pan().onChange((e) => {
    x.value += e.x;
    y.value += e.y;
  });

  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEndEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleTextChange = useCallback(
    (newText: string) => {
      text.value = newText;
    },
    [text]
  );
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style}>
        {isEditing ? (
          <TextInput
            style={{ fontSize, width: fontSize * length, top: 0, left: 0 }}
            onChangeText={handleTextChange}
            onBlur={handleEndEditing}
            autoFocus
          />
        ) : (
          <Animated.Text
            style={{ fontSize, top: 0, left: 0 }}
            onPress={handleStartEditing}
          >
            {text.value}
          </Animated.Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
