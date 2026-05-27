import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors, Spacing, Typography } from "../theme/theme";
import { useApp } from "../context/AppContext";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return (
      <View style={styles.center}>
        <Text>Product niet gevonden</Text>
      </View>
    );

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.tagRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
              {product.isNew && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: Colors.success },
                  ]}
                >
                  <Text style={styles.statusText}>NIEUW</Text>
                </View>
              )}
            </View>
            <View style={styles.ratingBox}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingValue}>{product.rating}</Text>
            </View>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>€{product.price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Over dit product</Text>
          <Text style={styles.descriptionText}>
            {product.description ||
              "Een kwaliteitsvol product van het Busleyden Atheneum. Perfect voor dagelijks schoolgebruik."}
          </Text>

          <View style={styles.specsCard}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Beschikbaarheid</Text>
              <Text style={styles.specValue}>Op voorraad</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Levertijd</Text>
              <Text style={styles.specValue}>1-2 werkdagen</Text>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Selecteer aantal</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Totaal</Text>
          <Text style={styles.totalPrice}>
            €{(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="white" />
          <Text style={styles.buyButtonText}>Bestellen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "white" },
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 350, resizeMode: "cover" },
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tagRow: { flexDirection: "row" },
  categoryBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: { fontSize: 12, color: "#666", fontWeight: "600" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, color: "white", fontWeight: "bold" },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingValue: { marginLeft: 4, fontWeight: "bold", color: "#FFB000" },
  name: { ...Typography.h1, fontSize: 26, color: Colors.text, marginBottom: 5 },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginBottom: 20 },
  sectionTitle: { ...Typography.h3, marginBottom: 10, color: Colors.text },
  descriptionText: {
    ...Typography.body,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  specsCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  specLabel: { color: "#888" },
  specValue: { fontWeight: "500", color: Colors.text },
  quantitySection: { marginBottom: 20 },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderRadius: 12,
    padding: 5,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  qtyText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 20 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 35,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalInfo: { flex: 1 },
  totalLabel: { color: "#999", fontSize: 12 },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: Colors.text },
  buyButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 3,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProductDetailsScreen;
