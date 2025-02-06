import { Platform } from "react-native";

const LOCALHOST = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
export const API_BASE_URL = `http://${LOCALHOST}:8080`;
