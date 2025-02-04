import { InputProvider } from "@/context/input";
import { StampProvider } from "@/context/stamp";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StampProvider>
        <InputProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#25292e",
              },
              headerTintColor: "#fff",
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Stampede" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </InputProvider>
      </StampProvider>
    </GestureHandlerRootView>
  );
}
