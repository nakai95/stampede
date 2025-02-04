import { GestureHandler } from "@/components/GestureHandler";
import StampList from "@/components/StampList";
import StampPicker from "@/components/StampPicker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import Stamp from "@/components/Stamp";
import { useStampContext } from "@/context/stamp";
import { Canvas, DataSourceParam, useImage } from "@shopify/react-native-skia";
import { useCallback, useMemo, useState } from "react";
import { Alert, Dimensions, Linking, StyleSheet, View } from "react-native";
import TextInputField from "@/components/TextField";
import { useInputContext } from "@/context/input";
import { InputGestureHandler } from "@/components/InputGestureHandler";

const { width } = Dimensions.get("window");

export default function Index() {
  const { stamps, resetStamps, addStamp } = useStampContext();
  const { inputs, addInput, resetInputs } = useInputContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const hasData = useMemo(
    () => stamps.length > 0 || inputs.length > 0,
    [stamps, inputs]
  );

  const handleAddSticker = useCallback(() => {
    setIsModalVisible(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const handleSelectStamp = useCallback(
    (imgSource: DataSourceParam, index: number) => {
      addStamp({ size: 40, imgSource, index });
      setIsModalVisible(false);
    },
    []
  );
  const handleAddInput = useCallback(() => {
    addInput({
      fontSize: 14,
      length: 10,
    });
  }, []);
  const handleReset = useCallback(() => {
    resetStamps();
    resetInputs();
  }, []);

  // createdページに遷移する
  const handleNavigateToCreated = useCallback(() => {
    Linking.openURL("http://localhost:8080/created");
    handleReset();
  }, []);

  // GET /image からpng画像を取得
  const image = useImage("http://localhost:8080/image");

  if (!image) {
    console.log("image not loaded");
    return null;
  }

  const aspectRatio = image.height() / image.width();
  const imgWidth = width * 0.85;
  const imgHeight = imgWidth * aspectRatio;

  const handleSave = async () => {
    if (!hasData) {
      Alert.alert("No data to save");
      return;
    }
    const widthPt = 595.28; // A4の横サイズ
    const ratio = widthPt / imgWidth;

    const inputsData = inputs.map((input) => ({
      x: input.x.get() * ratio,
      y: -input.y.get() * ratio,
      text: input.text.value,
      fontSize: input.fontSize,
    }));

    const stampsData = stamps.map((stamp) => ({
      x: stamp.x.get() * ratio,
      y: -stamp.y.get() * ratio,
      stampIndex: stamp.index,
    }));

    const res = await fetch("http://localhost:8080/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: inputsData,
        stamps: stampsData,
      }),
    });

    if (res.ok) {
      Alert.alert("Success", "Open the created PDF in your default browser. ", [
        { text: "OK", onPress: handleNavigateToCreated },
      ]);
    } else {
      Alert.alert("Failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas
          style={{
            flex: 1,
          }}
        >
          <ImageViewer image={image} width={imgWidth} height={imgHeight} />
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
          <IconButton
            icon="save"
            disabled={!hasData}
            label="Save"
            onPress={handleSave}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    gap: 4,
  },
  canvasContainer: { height: "85%", width: width * 0.85 },
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
