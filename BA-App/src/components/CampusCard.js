import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing } from "../theme/theme";
import { MapPin } from "lucide-react-native";

const CampusCard = ({ campus, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: campus.color },
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(campus)}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: campus.color + "20" },
          ]}
        >
          <MapPin size={24} color={campus.color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{campus.name}</Text>
          <Text style={styles.description}>Berthoutinstituut Campus</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: Spacing.sm,
    padding: Spacing.md,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ translateX: 5 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export default CampusCard;
