import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Canvas, DataSourceParam } from "@shopify/react-native-skia";
import Stamp from "./Stamp";
import { API_BASE_URL } from "@/constant/url";

type Props = {
  onSelect: (stamp: DataSourceParam, index: number) => void;
  onCloseModal: () => void;
};

export default function StampList({ onSelect, onCloseModal }: Props) {
  const [stamps] = useState<DataSourceParam[]>([
    `${API_BASE_URL}/stamp/0`,
    `${API_BASE_URL}/stamp/1`,
    `${API_BASE_URL}/stamp/2`,
    `${API_BASE_URL}/stamp/3`,
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={stamps}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item, index);
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
