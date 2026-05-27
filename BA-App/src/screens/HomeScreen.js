import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors, Spacing } from "../theme/theme";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welkom bij BA App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default HomeScreen;
