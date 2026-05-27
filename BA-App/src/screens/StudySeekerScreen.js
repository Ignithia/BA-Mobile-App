import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors, Spacing, Typography } from "../theme/theme";
import { CheckCircle2, ChevronRight } from "lucide-react-native";
import { fetchStromen, fetchStudiekeuzes } from "../services/api";

const StudySeekerScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interests, setInterests] = useState([]);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stromenData, studieData] = await Promise.all([
          fetchStromen(),
          fetchStudiekeuzes(),
        ]);
        setInterests(stromenData);
        setStudies(studieData);
      } catch (error) {
        console.error("Error loading study seeker data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const filteredStudies = studies.filter(
    (study) =>
      selectedInterests.length === 0 ||
      study.interests.some((i) => selectedInterests.includes(i)),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vind je ideale studie</Text>
        <Text style={styles.subtitle}>
          Selecteer je interesses en ontdek wat bij je past.
        </Text>
      </View>

      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.interestList}
        >
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                styles.interestChip,
                selectedInterests.includes(interest) &&
                  styles.interestChipSelected,
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text
                style={[
                  styles.interestText,
                  selectedInterests.includes(interest) &&
                    styles.interestTextSelected,
                ]}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStudies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studyCard}>
            <View style={styles.studyInfo}>
              <Text style={styles.studyName}>{item.name}</Text>
              <View style={styles.tagContainer}>
                {item.interests.map((i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{i}</Text>
                  </View>
                ))}
              </View>
            </View>
            <ChevronRight color={Colors.grey} size={20} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.noResults}>Geen studies gevonden.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.grey,
    marginTop: Spacing.xs,
  },
  filterSection: {
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  interestList: {
    paddingHorizontal: Spacing.md,
  },
  interestChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: "transparent",
  },
  interestChipSelected: {
    backgroundColor: Colors.primary + "10",
    borderColor: Colors.primary,
  },
  interestText: {
    ...Typography.body,
    color: Colors.text,
  },
  interestTextSelected: {
    color: Colors.primary,
    fontWeight: "600",
  },
  studyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studyInfo: {
    flex: 1,
  },
  studyName: {
    ...Typography.h3,
    color: Colors.text,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  tagText: {
    fontSize: 10,
    color: Colors.grey,
  },
  noResults: {
    ...Typography.body,
    color: Colors.grey,
  },
});

export default StudySeekerScreen;
