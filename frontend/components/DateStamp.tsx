import React from "react";
import {
  Canvas,
  Circle,
  Paint,
  Text,
  useFont,
  Skia,
  Group,
  Line,
  Path,
} from "@shopify/react-native-skia";

type Props = {
  date: Date;
  topText: string;
  bottomText: string;
};

export default function DateStamp({ date, topText, bottomText }: Props) {
  const fontSize = 10;
  const font = useFont(
    require("@/assets/fonts/SpaceMono-Regular.ttf"),
    fontSize
  );
  const dateFontSize = 8;
  const dateFont = useFont(
    require("@/assets/fonts/SpaceMono-Regular.ttf"),
    dateFontSize
  );

  if (!font) {
    return null;
  }

  const radius = 20;
  const centerX = radius;
  const centerY = radius;
  const strokeWidth = 1;
  const textColor = Skia.Color("red");
  const dateArray = date.toISOString().split("T")[0].split("-");
  const year = dateArray[0].slice(2);
  const month = dateArray[1];
  const day = dateArray[2];
  const middleText = `${year},${month},${day}`;

  return (
    <Group transform={[{ translateX: 50 }, { translateY: 50 }]}>
      {/* 円形の印鑑 */}
      <Circle
        cx={centerX}
        cy={centerY}
        r={radius}
        color="red"
        style="stroke"
        strokeWidth={strokeWidth}
      />

      {/* 上部の文字列 */}
      <Text
        x={centerX - (fontSize * topText.length) / 3}
        y={centerY - radius / 2.5}
        text={topText}
        font={font}
        color={textColor}
      />

      {/* 中部の日付 */}
      <Text
        x={centerX - radius}
        y={centerY + dateFontSize / 2}
        text={middleText}
        font={dateFont}
        color={textColor}
      />

      {/* 下部の文字列 */}
      <Text
        x={centerX - (fontSize * bottomText.length) / 3}
        y={centerY + dateFontSize / 2 + fontSize}
        text={bottomText}
        font={font}
        color={textColor}
      />

      <Line
        p1={{ x: centerX - radius, y: centerY - radius / 3 }}
        p2={{ x: centerX + radius, y: centerY - radius / 3 }}
        color="red"
        strokeWidth={strokeWidth}
      />
      <Line
        p1={{ x: centerX - radius, y: centerY + radius / 3 }}
        p2={{ x: centerX + radius, y: centerY + radius / 3 }}
        color="red"
        strokeWidth={strokeWidth}
      />
    </Group>
  );
}
