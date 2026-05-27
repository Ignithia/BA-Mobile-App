import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors, Spacing, Typography } from "../theme/theme";
import { fetchProducts, fetchNews } from "../services/api";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodData, newsData] = await Promise.all([
          fetchProducts(),
          fetchNews(),
        ]);
        setProducts(prodData.slice(0, 4)); // Only show top 4 on home
        setNews(newsData.slice(0, 3)); // Only show top 3 on home
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welkom bij</Text>
        <Text style={styles.brandText}>Busleyden Atheneum</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nieuwste Producten</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Winkel")}>
            <Text style={styles.seeAll}>Bekijk alles</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.horizontalItem}>
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("ProductDetails", { product: item })
                }
              />
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Laatste Nieuws</Text>
          <TouchableOpacity onPress={() => navigation.navigate("NieuwsStack")}>
            <Text style={styles.seeAll}>Bekijk alles</Text>
          </TouchableOpacity>
        </View>
        {news.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate("NewsDetails", { news: item })}
          />
        ))}
      </View>
      <View style={{ height: Spacing.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: Spacing.md,
  },
  welcomeText: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  brandText: {
    ...Typography.h1,
    color: Colors.white,
    fontSize: 28,
  },
  section: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  seeAll: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: "600",
  },
  horizontalItem: {
    width: 180,
    marginRight: Spacing.sm,
  },
});

export default HomeScreen;
