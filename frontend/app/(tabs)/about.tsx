import { Canvas, Circle, Group, useImage } from "@shopify/react-native-skia";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e",
  },
});
