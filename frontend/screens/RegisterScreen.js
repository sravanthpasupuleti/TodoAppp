// frontend/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import API from '../utils/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { name, email, password });
      setMsg('Registration Successful. Please log in.');
      setTimeout(() => navigation.navigate('Login'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
      <Text>{msg}</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' }
});
