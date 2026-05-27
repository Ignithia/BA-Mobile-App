import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme/theme";

const NewsDetailsScreen = ({ route }) => {
  const { newsId } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nieuws Details: {newsId}</Text>
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

export default NewsDetailsScreen;
