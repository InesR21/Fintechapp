import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import CustomHeader from "@/components/CustomHeader";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            tint={"extraLight"}
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="wallet" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
