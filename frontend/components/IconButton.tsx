import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, disabled, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} disabled={disabled} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={disabled ? "#666" : "#fff"} />
      <Text style={[styles.iconButtonLabel, disabled && { color: "#666" }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
