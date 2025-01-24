import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Canvas, DataSourceParam } from "@shopify/react-native-skia";
import Stamp from "./Stamp";

type Props = {
  onSelect: (stamp: DataSourceParam) => void;
  onCloseModal: () => void;
};

export default function StampList({ onSelect, onCloseModal }: Props) {
  const [stamps] = useState<DataSourceParam[]>([
    require("@/assets/images/stamp1.png"),
    require("@/assets/images/stamp2.png"),
    require("@/assets/images/stamp3.png"),
    require("@/assets/images/stamp4.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={stamps}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Canvas style={styles.image}>
            <Stamp size={100} x={0} y={0} imgSource={item} />
          </Canvas>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
