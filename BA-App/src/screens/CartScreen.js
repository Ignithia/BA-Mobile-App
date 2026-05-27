import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, Spacing } from "../theme/theme";
import { useApp } from "../context/AppContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react-native";

const CartScreen = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingBag size={80} color={Colors.gray} />
        <Text style={styles.emptyText}>Je winkelmandje is leeg.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>
                €{(item.price * item.quantity).toFixed(2)}
              </Text>

              <View style={styles.controls}>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, -1)}
                    style={styles.qtyBtn}
                  >
                    <Minus size={16} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 1)}
                    style={styles.qtyBtn}
                  >
                    <Plus size={16} color="black" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Trash2 size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Totaal</Text>
          <Text style={styles.totalAmount}>€{cartTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>AFREKENEN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 20, fontSize: 18, color: "gray" },
  list: { padding: Spacing.md },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: Spacing.md,
    overflow: "hidden",
    elevation: 2,
  },
  itemImage: { width: 100, height: 100 },
  itemInfo: { flex: 1, padding: Spacing.sm, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: Colors.primary, fontWeight: "bold" },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 20,
    padding: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { marginHorizontal: 10, fontWeight: "bold" },
  footer: {
    backgroundColor: "white",
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: { fontSize: 18, color: "gray" },
  totalAmount: { fontSize: 22, fontWeight: "bold", color: Colors.primary },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default CartScreen;
