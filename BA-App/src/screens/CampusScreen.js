import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { fetchCampuses } from '../services/api';
import CampusCard from '../components/CampusCard';

const CampusScreen = ({ navigation }) => {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        const data = await fetchCampuses();
        setCampuses(data);
        setLoading(false);
    };
    load();
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={campuses}
        renderItem={({ item }) => (
          <CampusCard 
            campus={item} 
            onPress={(c) => navigation.navigate('CampusDetails', { campusId: c.id, campus: c })} 
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: Spacing.md },
});

export default CampusScreen;
