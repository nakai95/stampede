import { Canvas, Image, SkImage } from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type Props = {
  image: SkImage;
  width: number;
  height: number;
};

export default function ImageViewer(props: Props) {
  return <Image x={0} y={0} {...props} />;
}
