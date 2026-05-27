import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme/theme";

const CampusDetailsScreen = ({ route }) => {
  const { campusId } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Details: {campusId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CampusDetailsScreen;
