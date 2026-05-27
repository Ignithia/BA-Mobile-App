import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Colors, Spacing, Typography } from "../theme/theme";
import { Calendar, Share2, ArrowLeft } from "lucide-react-native";
import RenderHTML from "react-native-render-html";

const NewsDetailsScreen = ({ route, navigation }) => {
  const { news } = route.params || {};
  const item = news;
  const { width } = useWindowDimensions();

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Nieuwsbericht niet gevonden</Text>
      </View>
    );
  }

  const tagsStyles = {
    p: {
      color: "#444",
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 15,
    },
    h1: {
      color: Colors.primary,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    h2: {
      color: Colors.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: Colors.primary,
      paddingLeft: 15,
      fontStyle: "italic",
      marginVertical: 15,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.meta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar size={14} color="#666" />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.divider} />

        <RenderHTML
          contentWidth={width - Spacing.md * 2}
          source={{ html: item.content || "" }}
          tagsStyles={tagsStyles}
        />

        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={20} color={Colors.primary} />
          <Text style={styles.shareText}>Deel dit bericht</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: Spacing.md,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + "15",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 6,
    color: "#666",
    fontSize: 14,
  },
  title: {
    ...Typography.h1,
    fontSize: 24,
    lineHeight: 32,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: Spacing.md,
  },
  contentText: {
    ...Typography.body,
    lineHeight: 26,
    color: "#444",
    marginBottom: 40,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    marginBottom: 20,
  },
  shareText: {
    color: Colors.primary,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default NewsDetailsScreen;
