import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { useApp } from '../context/AppContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();

  const handleLogin = () => {
    // Dummy login
    if (email && password) {
        login({ email, name: 'Student BA' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Mijn BA</Text>
          <Text style={styles.subtitle}>Log in met je studentenaccount</Text>
      </View>

      <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="student@ba.be" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Wachtwoord</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>INLOGGEN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotBtnText}>Wachtwoord vergeten?</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: Spacing.xl },
  header: { marginBottom: 40, marginTop: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.primary },
  subtitle: { fontSize: 16, color: 'gray', marginTop: 8 },
  form: { flex: 1 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: { backgroundColor: Colors.gray, padding: 15, borderRadius: 10, marginBottom: 20 },
  loginBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  forgotBtn: { marginTop: 20, alignItems: 'center' },
  forgotBtnText: { color: Colors.primary },
});

export default LoginScreen;
