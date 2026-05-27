import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Colors, Spacing } from "../theme/theme";
import { School, Trophy, MapPin, BookOpen } from "lucide-react-native";

const { width } = Dimensions.get("window");

// BA Campuses with their main subjects and brand colors
const CAMPUSES = [
  {
    name: "Zandpoort",
    color: "#E4352D", // Rood
    subjects: ["Sport", "Lassen", "Hout", "Mechanica", "Elektriciteit"],
  },
  {
    name: "Caputsteen",
    color: "#1F62A9", // Blauw
    subjects: ["Economie", "IT-Beheer", "Talen", "Office Management"],
  },
  {
    name: "Botaniek",
    color: "#E85597", // Roze
    subjects: ["Verzorging", "Haartooi", "Mode", "Gezondheidszorg"],
  },
  {
    name: "Pitzemburg",
    color: "#4CAF50", // Groen
    subjects: ["Latijn", "Wetenschappen", "Grieks", "Wiskunde"],
  },
  {
    name: "De Ham",
    color: "#F5A528", // Oranje
    subjects: ["Media", "Journalistiek", "Fotografie", "Design"],
  },
  {
    name: "De Beemden",
    color: "#1CAFC9", // Lichtblauw
    subjects: ["Handel", "Logistiek", "Verkoop"],
  },
];

const MiniGameScreen = () => {
  const [gameState, setGameState] = useState("START"); // START, PLAYING, END
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [currentChallenge, setCurrentChallenge] = useState({
    subject: "",
    correctCampus: null,
    distractorColor: "",
    options: [],
  });
  const [shake] = useState(new Animated.Value(0));
  const timerRef = useRef(null);

  const generateChallenge = () => {
    // Pick a random campus and one of its subjects
    const campusIdx = Math.floor(Math.random() * CAMPUSES.length);
    const selectedCampus = CAMPUSES[campusIdx];
    const subjectIdx = Math.floor(
      Math.random() * selectedCampus.subjects.length,
    );
    const subject = selectedCampus.subjects[subjectIdx];

    // Pick a distractor color (can be any campus color)
    const distractorIdx = Math.floor(Math.random() * CAMPUSES.length);
    const distractorColor = CAMPUSES[distractorIdx].color;

    // Shuffle options
    const options = [...CAMPUSES].sort(() => Math.random() - 0.5);

    setCurrentChallenge({
      subject,
      correctCampus: selectedCampus,
      distractorColor,
      options,
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(25);
    setGameState("PLAYING");
    generateChallenge();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState("END");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChoice = (campusName) => {
    if (campusName === currentChallenge.correctCampus.name) {
      setScore((s) => s + 15);
      setTimeLeft((t) => Math.min(40, t + 1));
      generateChallenge();
    } else {
      triggerShake();
      setScore((s) => Math.max(0, s - 10));
      setTimeLeft((t) => Math.max(0, t - 2));
      generateChallenge();
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <View style={styles.container}>
      {gameState === "START" && (
        <View style={styles.center}>
          <View style={styles.iconCircle}>
            <School size={50} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Campus Sorter</Text>
          <Text style={styles.instruction}>
            Welke{" "}
            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              Campus
            </Text>{" "}
            hoort bij dit vak?
          </Text>

          <View style={styles.tipCard}>
            <BookOpen size={20} color="#666" style={{ marginBottom: 5 }} />
            <Text style={styles.tipText}>
              Let niet op de kleur van de tekst, focus op het vak zelf!
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.buttonText}>START DE SCHOOL CHALLENGE</Text>
          </TouchableOpacity>
        </View>
      )}

      {gameState === "PLAYING" && (
        <View style={styles.gameView}>
          <View style={styles.hud}>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>SCORE</Text>
              <Text style={styles.hudValue}>{score}</Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>TIJD</Text>
              <Text
                style={[
                  styles.hudValue,
                  timeLeft < 7 && { color: Colors.error },
                ]}
              >
                {timeLeft}s
              </Text>
            </View>
          </View>

          <Animated.View
            style={[
              styles.challengeBox,
              { transform: [{ translateX: shake }] },
            ]}
          >
            <Text
              style={[
                styles.challengeSubject,
                { color: currentChallenge.distractorColor },
              ]}
            >
              {currentChallenge.subject}
            </Text>
          </Animated.View>

          <View style={styles.optionsGrid}>
            {currentChallenge.options.map((campus) => (
              <TouchableOpacity
                key={campus.name}
                style={[styles.campusButton, { borderLeftColor: campus.color }]}
                onPress={() => handleChoice(campus.name)}
                activeOpacity={0.8}
              >
                <MapPin size={16} color={campus.color} />
                <Text style={styles.campusButtonText}>{campus.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gameState === "END" && (
        <View style={styles.center}>
          <View style={[styles.iconCircle, { backgroundColor: "#FFD700" }]}>
            <Trophy size={50} color="white" />
          </View>
          <Text style={styles.title}>Lesoverzicht!</Text>
          <Text style={styles.finalScoreLabel}>Jouw BA Kennis Score:</Text>
          <Text style={styles.finalScoreValue}>{score}</Text>

          <View style={styles.resultBox}>
            <Text style={styles.resultDetails}>
              {score > 250
                ? "Directeur Materiaal! Je kent alle campussen uit je hoofd."
                : score > 150
                  ? "Prima rapport! Je weet precies waar je moet zijn."
                  : "Nog even studeren... probeer het formulier op de website eens!"}
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.buttonText}>PROBEER OPNIEUW</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: Spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.text,
    marginBottom: 10,
    letterSpacing: -1,
  },
  instruction: {
    fontSize: 18,
    color: "#444",
    marginBottom: 30,
    textAlign: "center",
  },
  tipCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  gameView: {
    flex: 1,
    paddingTop: 30,
  },
  hud: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  hudItem: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    minWidth: 100,
    alignItems: "center",
    elevation: 2,
  },
  hudLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  hudValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  challengeBox: {
    backgroundColor: "white",
    height: 140,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  challengeSubject: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 15,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  campusButton: {
    backgroundColor: "white",
    width: (width - 60) / 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 6,
    elevation: 2,
  },
  campusButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 8,
  },
  finalScoreLabel: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  finalScoreValue: {
    fontSize: 64,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: "100%",
    elevation: 2,
  },
  resultDetails: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
});

export default MiniGameScreen;
