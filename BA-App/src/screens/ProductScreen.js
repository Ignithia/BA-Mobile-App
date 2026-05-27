import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Spacing } from "../theme/theme";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Filter,
  ArrowUpAz,
  ArrowDownAz,
  ArrowUp10,
  ArrowDown10,
  X,
} from "lucide-react-native";

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["Alles"]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alles");
  const [sortBy, setSortBy] = useState(null); // 'name-asc', 'name-desc', 'price-asc', 'price-desc'
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, category, sortBy, products]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodData, catData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prodData);
      setCategories(catData);
      setError(null);
    } catch (err) {
      setError("Kon producten niet laden.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    // Search
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "Alles") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    if (sortBy === "name-asc")
      result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc")
      result.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("Alles");
    setSortBy(null);
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Producten zoeken..."
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch("")}>
              <X size={20} color="gray" />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  category === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sortRow}>
          <TouchableOpacity
            onPress={() => setSortBy("name-asc")}
            style={[
              styles.sortBtn,
              sortBy === "name-asc" && styles.sortBtnActive,
            ]}
          >
            <ArrowUpAz
              size={16}
              color={sortBy === "name-asc" ? "white" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortBy("name-desc")}
            style={[
              styles.sortBtn,
              sortBy === "name-desc" && styles.sortBtnActive,
            ]}
          >
            <ArrowDownAz
              size={16}
              color={sortBy === "name-desc" ? "white" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortBy("price-asc")}
            style={[
              styles.sortBtn,
              sortBy === "price-asc" && styles.sortBtnActive,
            ]}
          >
            <ArrowUp10
              size={16}
              color={sortBy === "price-asc" ? "white" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortBy("price-desc")}
            style={[
              styles.sortBtn,
              sortBy === "price-desc" && styles.sortBtnActive,
            ]}
          >
            <ArrowDown10
              size={16}
              color={sortBy === "price-desc" ? "white" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={resetFilters} style={styles.resetBtn}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(p) =>
              navigation.navigate("ProductDetails", { product: p })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Geen producten gevonden.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { backgroundColor: "white", padding: Spacing.md, elevation: 2 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    height: 40,
    marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: Spacing.sm },
  filterRow: { flexDirection: "row", marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    marginRight: 8,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: 12, color: "#666" },
  chipTextActive: { color: "white", fontWeight: "bold" },
  sortRow: { flexDirection: "row", alignItems: "center" },
  sortBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray,
    marginRight: 8,
  },
  sortBtnActive: { backgroundColor: Colors.primary },
  resetBtn: { marginLeft: "auto" },
  resetText: { color: Colors.error, fontWeight: "bold" },
  list: { paddingHorizontal: Spacing.sm, paddingBottom: 20 },
  emptyText: { textAlign: "center", marginTop: 40, color: "gray" },
});

export default ProductScreen;
