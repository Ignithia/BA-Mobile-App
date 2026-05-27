import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { CheckCircle2, ChevronRight } from 'lucide-react-native';

const INTERESTS = [
  'Technologie', 'Zorg', 'Economie', 'Talen', 'Sport', 'Kunst', 'Wetenschappen'
];

const STUDIES = [
  { id: '1', name: 'Informatica', interests: ['Technologie', 'Wetenschappen'] },
  { id: '2', name: 'Verpleegkunde', interests: ['Zorg', 'Wetenschappen'] },
  { id: '3', name: 'Bedrijfskunde', interests: ['Economie', 'Talen'] },
  { id: '4', name: 'Lichamelijke Opvoeding', interests: ['Sport'] },
  { id: '5', name: 'Grafische Vormgeving', interests: ['Kunst', 'Technologie'] },
  { id: '6', name: 'Talen & Literatuur', interests: ['Talen', 'Kunst'] },
];

const StudySeekerScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const filteredStudies = STUDIES.filter(study => 
    selectedInterests.length === 0 || 
    study.interests.some(i => selectedInterests.includes(i))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vind je ideale studie</Text>
        <Text style={styles.subtitle}>Selecteer je interesses en ontdek wat bij je past.</Text>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.interestList}>
          {INTERESTS.map(interest => (
            <TouchableOpacity 
              key={interest} 
              style={[
                styles.interestChip, 
                selectedInterests.includes(interest) && styles.interestChipSelected
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text style={[
                styles.interestText,
                selectedInterests.includes(interest) && styles.interestTextSelected
              ]}>{interest}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStudies}
        renderItem={({ item }) => (
          <View style={styles.studyCard}>
            <View style={styles.studyInfo}>
                <Text style={styles.studyName}>{item.name}</Text>
                <View style={styles.tagContainer}>
                    {item.interests.map(i => (
                        <View key={i} style={styles.tag}><Text style={styles.tagText}>{i}</Text></View>
                    ))}
                </View>
            </View>
            <ChevronRight color={Colors.primary} />
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Geen studies gevonden voor deze interesses.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.md, backgroundColor: Colors.primary },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  filterSection: { marginVertical: Spacing.md },
  interestList: { paddingHorizontal: Spacing.md },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  interestChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  interestText: { color: '#333' },
  interestTextSelected: { color: 'white', fontWeight: 'bold' },
  list: { padding: Spacing.md },
  studyCard: {
    backgroundColor: 'white',
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  studyName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: Colors.gray, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 4, marginTop: 4 },
  tagText: { fontSize: 10, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 40, color: 'gray' }
});

export default StudySeekerScreen;
