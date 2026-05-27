import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { Star } from 'lucide-react-native';

const ProductCard = ({ product, onPress, showPrice = true }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]} 
      onPress={() => onPress(product)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      
      {product.isNew && (
        <View style={[styles.label, { backgroundColor: Colors.success }]}>
          <Text style={styles.labelText}>NIEUW</Text>
        </View>
      )}
      
      {product.isSale && (
        <View style={[styles.label, { backgroundColor: Colors.error, top: product.isNew ? 35 : 10 }]}>
          <Text style={styles.labelText}>SALE</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        
        <View style={styles.footer}>
          {showPrice && <Text style={styles.price}>€{product.price.toFixed(2)}</Text>}
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: Spacing.sm,
    width: 170,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: Spacing.sm,
  },
  category: {
    fontSize: 10,
    color: 'gray',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginLeft: 2,
    color: '#666',
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductCard;
