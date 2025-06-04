// frontend/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import API from '../utils/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;
      setMsg('Login Successful');
      navigation.navigate('Home', { token, user });
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
      <Text>{msg}</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' }
});
