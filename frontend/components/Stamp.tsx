import {
  AnimatedProp,
  DataSourceParam,
  Image,
  useImage,
} from "@shopify/react-native-skia";
import { useEffect } from "react";

type Props = {
  size: number;
  x: AnimatedProp<number | undefined>;
  y: AnimatedProp<number | undefined>;
  imgSource: DataSourceParam;
};

export default function Stamp({ size, x, y, imgSource }: Props) {
  useEffect(() => {
    console.log("[x y]", x, y);
  }, [x, y]);
  const image = useImage(imgSource);
  if (!image) {
    return null;
  }

  return <Image image={image} x={x} y={y} width={size} height={size} />;
}
