import React from "react";
import { RoundedRect } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";

type Props = {
  fontSize: number;
  length: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
};

export default function ({ fontSize, length, x, y }: Props) {
  return (
    <RoundedRect
      x={x}
      y={y}
      width={fontSize * length}
      height={fontSize}
      r={4}
      color="silver"
    />
  );
}
