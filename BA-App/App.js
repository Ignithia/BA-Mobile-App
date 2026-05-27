import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/AppContext";

// Ignore specific warnings from third-party libraries
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
  "MemoizedTNodeRenderer",
  "TRenderEngineProvider",
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
