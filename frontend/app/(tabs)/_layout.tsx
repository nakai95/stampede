import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StampProvider } from "@/context/stamp";
import { InputProvider } from "@/context/input";

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StampProvider>
        <InputProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "#ffd33d",
              headerStyle: {
                backgroundColor: "#25292e",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              tabBarStyle: {
                backgroundColor: "#25292e",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                    name={focused ? "home-sharp" : "home-outline"}
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="about"
              options={{
                title: "About",
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                    name={
                      focused
                        ? "information-circle"
                        : "information-circle-outline"
                    }
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
          </Tabs>
        </InputProvider>
      </StampProvider>
    </GestureHandlerRootView>
  );
}
