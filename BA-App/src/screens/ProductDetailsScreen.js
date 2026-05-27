import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, Spacing } from "../theme/theme";
import { useApp } from "../context/AppContext";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react-native";

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
    // Optional: show some feedback
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{product.category}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>€{product.price.toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Aantal</Text>
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

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Totaal:</Text>
          <Text style={styles.totalPrice}>
            €{(product.price * quantity).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.buyButtonText}>In winkelmandje</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, resizeMode: "cover" },
  content: { padding: Spacing.md },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  category: { color: "gray", textTransform: "uppercase", fontSize: 12 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  rating: { marginLeft: 4, fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  description: { color: "#666", lineHeight: 22, marginBottom: 24 },
  quantitySection: { marginBottom: 24 },
  quantityControls: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { marginHorizontal: 20, fontSize: 18, fontWeight: "bold" },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalPrice: { fontSize: 22, fontWeight: "bold", color: Colors.primary },
  buyButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ProductDetailsScreen;
