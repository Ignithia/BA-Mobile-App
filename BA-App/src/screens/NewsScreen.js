import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { fetchNews } from '../services/api';
import NewsCard from '../components/NewsCard';
import { Search, X, ArrowUpAz, ArrowDownAz } from 'lucide-react-native';

const CATEGORIES = ['Alles', 'Event', 'Info'];

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Alles');
  const [sortBy, setSortBy] = useState(null); // 'title-asc', 'title-desc'
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, category, sortBy, news]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNews();
      setNews(data);
      setError(null);
    } catch (err) {
      setError('Kon nieuws niet laden.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...news];

    if (search) {
      result = result.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== 'Alles') {
      result = result.filter(n => n.category === category);
    }

    if (sortBy === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));

    setFilteredNews(result);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Nieuws zoeken..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filterRow}>
            {CATEGORIES.map(cat => (
                <TouchableOpacity 
                    key={cat} 
                    style={[styles.chip, category === cat && styles.chipActive]}
                    onPress={() => setCategory(cat)}
                >
                    <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
            ))}
            <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                <TouchableOpacity onPress={() => setSortBy('title-asc')} style={[styles.sortBtn, sortBy === 'title-asc' && styles.sortBtnActive]}>
                    <ArrowUpAz size={16} color={sortBy === 'title-asc' ? 'white' : 'gray'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSortBy('title-desc')} style={[styles.sortBtn, sortBy === 'title-desc' && styles.sortBtnActive]}>
                    <ArrowDownAz size={16} color={sortBy === 'title-desc' ? 'white' : 'gray'} />
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <FlatList
        data={filteredNews}
        renderItem={({ item }) => (
          <NewsCard 
            item={item} 
            onPress={(n) => navigation.navigate('NewsDetails', { news: n })} 
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Geen nieuws gevonden.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: 'white', padding: Spacing.md, elevation: 2 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray, paddingHorizontal: Spacing.sm, borderRadius: 8, height: 40, marginBottom: 12 },
  searchInput: { flex: 1, marginLeft: Spacing.sm },
  filterRow: { flexDirection: 'row', alignItems: 'center' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.gray, marginRight: 8 },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: 12, color: '#666' },
  chipTextActive: { color: 'white', fontWeight: 'bold' },
  sortBtn: { padding: 8, borderRadius: 8, backgroundColor: Colors.gray, marginLeft: 8 },
  sortBtnActive: { backgroundColor: Colors.primary },
  list: { padding: Spacing.md },
  emptyText: { textAlign: 'center', marginTop: 40, color: 'gray' },
});

export default NewsScreen;
