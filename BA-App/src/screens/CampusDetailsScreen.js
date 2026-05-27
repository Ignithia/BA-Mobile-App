import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { Colors, Spacing, Typography } from "../theme/theme";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Navigation,
  BookOpen,
} from "lucide-react-native";
import { fetchStromen } from "../services/api";

const CampusDetailsScreen = ({ route, navigation }) => {
  const { campus } = route.params || {};
  const [stromen, setStromen] = useState([]);

  useEffect(() => {
    const loadStromen = async () => {
      const data = await fetchStromen();
      setStromen(data);
    };
    loadStromen();
  }, []);

  if (!campus) {
    return (
      <View style={styles.center}>
        <Text>Campus info niet gevonden</Text>
      </View>
    );
  }

  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      campus.name + " Busleyden Atheneum",
    )}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: campus.image }} style={styles.image} />
        <View
          style={[styles.overlay, { backgroundColor: campus.color + "60" }]}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <View style={styles.titleOverlay}>
          <Text style={styles.campusName}>{campus.name}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>Busleyden Atheneum</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Over deze campus</Text>
          <Text style={styles.description}>
            Dit is de {campus.name} campus van het Busleyden Atheneum in
            Mechelen. Hier bieden we gespescialiseerde opleidingen aan in een
            inspirerende omgeving.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact & Locatie</Text>

          <TouchableOpacity style={styles.infoRow} onPress={handleOpenMap}>
            <View
              style={[styles.iconBox, { backgroundColor: campus.color + "15" }]}
            >
              <MapPin size={20} color={campus.color} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Adres</Text>
              <Text style={styles.infoValue}>Mechelen, België</Text>
            </View>
            <Navigation size={18} color="#999" />
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <View
              style={[styles.iconBox, { backgroundColor: campus.color + "15" }]}
            >
              <Phone size={20} color={campus.color} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Telefoon</Text>
              <Text style={styles.infoValue}>+32 15 12 34 56</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View
              style={[styles.iconBox, { backgroundColor: campus.color + "15" }]}
            >
              <Mail size={20} color={campus.color} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>info.{campus.id}@ba.be</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Opleidingen op deze campus</Text>
          <View style={styles.stromenGrid}>
            {stromen.map((stroom, index) => (
              <View
                key={index}
                style={[
                  styles.stroomBadge,
                  { backgroundColor: campus.color + "15" },
                ]}
              >
                <BookOpen size={14} color={campus.color} />
                <Text style={[styles.stroomText, { color: campus.color }]}>
                  {stroom}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.websiteButton, { backgroundColor: campus.color }]}
          onPress={() => Linking.openURL("https://www.ba.be")}
        >
          <Globe size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.websiteButtonText}>Bezoek Website</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  titleOverlay: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  campusName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  typeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
  },
  typeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: Spacing.md,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: 10,
    color: Colors.text,
  },
  description: {
    ...Typography.body,
    color: "#666",
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  websiteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  websiteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  stromenGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  stroomBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
  },
  stroomText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
});

export default CampusDetailsScreen;
