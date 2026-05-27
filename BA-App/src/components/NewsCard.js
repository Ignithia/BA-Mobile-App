import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing } from "../theme/theme";

const NewsCard = ({ item, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.excerpt} numberOfLines={2}>
          {item.excerpt}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: Colors.gray,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.primary,
  },
  date: {
    fontSize: 10,
    color: "gray",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 12,
    color: "#666",
  },
});

export default NewsCard;
