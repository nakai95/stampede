import { GestureHandler } from "@/components/GestureHandler";
import CircleButton from "@/components/CircleButton";
import StampList from "@/components/StampList";
import StampPicker from "@/components/StampPicker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import Stamp from "@/components/Stamp";
import { useStampContext } from "@/context/stamp";
import {
  Canvas,
  Circle,
  DataSourceParam,
  Group,
  Rect,
  RoundedRect,
  Text,
  useFont,
  useImage,
} from "@shopify/react-native-skia";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import TextInputField from "@/components/TextField";
import { useInputContext } from "@/context/input";
import { InputGestureHandler } from "@/components/InputGestureHandler";

const imagePath = require("@/assets/images/invoice.png");

export default function Index() {
  const { stamps, resetStamps, addStamp } = useStampContext();
  const { inputs, addInput, resetInputs } = useInputContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddSticker = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleSelectStamp = (imgSource: DataSourceParam) => {
    addStamp({ size: 40, imgSource });
    setIsModalVisible(false);
  };
  const handleAddInput = () => {
    addInput({
      fontSize: 20,
      length: 10,
    });
  };

  const handleReset = () => {
    resetStamps();
    resetInputs();
  };

  const image = useImage(imagePath);

  if (!image) {
    console.log("image not loaded");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas style={{ flex: 1 }}>
          <ImageViewer imgSource={image} />
          {stamps.map((s, index) => (
            <Stamp key={index} {...s} />
          ))}
          {inputs.map((input, index) => (
            <TextInputField key={index} {...input} />
          ))}
        </Canvas>
        {stamps.map((s, index) => (
          <GestureHandler key={index} x={s.x} y={s.y} size={s.size} />
        ))}
        {inputs.map((i, index) => (
          <InputGestureHandler key={index} {...i} />
        ))}
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={handleReset} />
          <IconButton
            icon="approval"
            label="Stamp"
            onPress={handleAddSticker}
          />
          <IconButton
            icon="text-fields"
            label="Text"
            onPress={handleAddInput}
          />
        </View>
      </View>
      <StampPicker isVisible={isModalVisible} onClose={handleModalClose}>
        <StampList
          onSelect={handleSelectStamp}
          onCloseModal={handleModalClose}
        />
      </StampPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  canvasContainer: { height: "85%", width: "100%" },
  footerContainer: {
    alignItems: "center",
  },
  optionsContainer: {
    alignItems: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
  },
});
