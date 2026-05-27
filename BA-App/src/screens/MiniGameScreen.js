import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { RefreshCcw, Trophy } from 'lucide-react-native';

const MiniGameScreen = () => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, END
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [problem, setProblem] = useState({ a: 0, b: 0, options: [] });
  const timerRef = useRef(null);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const correct = a + b;
    
    let options = [correct];
    while (options.length < 4) {
      const wrong = correct + (Math.floor(Math.random() * 10) - 5);
      if (wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }
    setProblem({
      a, b,
      options: options.sort(() => Math.random() - 0.5)
    });
  };

  const startGame = () => {
    setScore(0);
    setTimer(30);
    setGameState('PLAYING');
    generateProblem();
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('END');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const checkAnswer = (answer) => {
    if (answer === problem.a + problem.b) {
      setScore(s => s + 10);
      generateProblem();
    } else {
      setScore(s => Math.max(0, s - 5));
      generateProblem();
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <View style={styles.container}>
      {gameState === 'START' && (
        <View style={styles.center}>
          <Text style={styles.title}>School Math Challenge</Text>
          <Text style={styles.instruction}>Beantwoord zoveel mogelijk sommen binnen 30 seconden!</Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>START SPEL</Text>
          </TouchableOpacity>
        </View>
      )}

      {gameState === 'PLAYING' && (
        <View style={styles.gameView}>
          <View style={styles.hud}>
            <Text style={styles.hudText}>Score: {score}</Text>
            <Text style={[styles.hudText, timer < 10 && { color: Colors.error }]}>Tijd: {timer}s</Text>
          </View>
          
          <View style={styles.problemView}>
            <Text style={styles.mathText}>{problem.a} + {problem.b} = ?</Text>
          </View>

          <View style={styles.optionsGrid}>
            {problem.options.map(opt => (
              <TouchableOpacity key={opt} style={styles.optionButton} onPress={() => checkAnswer(opt)}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gameState === 'END' && (
        <View style={styles.center}>
          <Trophy size={60} color="#FFD700" />
          <Text style={styles.title}>Spel Voorbij!</Text>
          <Text style={styles.scoreResult}>Jouw score: {score}</Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <RefreshCcw size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>OPNIEUW PROBEREN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: Spacing.md },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.primary, marginBottom: 10 },
  instruction: { textAlign: 'center', marginBottom: 30, color: '#666', fontSize: 16 },
  button: { backgroundColor: Colors.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30, flexDirection: 'row', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  gameView: { flex: 1 },
  hud: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  hudText: { fontSize: 20, fontWeight: 'bold' },
  problemView: { backgroundColor: 'white', padding: 40, borderRadius: 20, alignItems: 'center', marginBottom: 40, elevation: 5 },
  mathText: { fontSize: 48, fontWeight: 'bold' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  optionButton: { backgroundColor: 'white', width: '40%', padding: 20, margin: '2%', borderRadius: 15, alignItems: 'center', borderWidth: 2, borderColor: Colors.primary },
  optionText: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  scoreResult: { fontSize: 24, marginBottom: 30 },
});

export default MiniGameScreen;
