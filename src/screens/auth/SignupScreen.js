import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import RoleSelector from '../../components/common/RoleSelector';
import { isValidEmail, isValidPassword, isValidPhone } from '../../utils/validators';

export default function SignupScreen({ navigation }) {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  function handleSignup() {
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number (e.g. 01012345678)');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    // Phase 1: account is not saved yet, storage comes in Phase 2
    Alert.alert('Account created', 'You can now log in', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to find or post properties</Text>

      <Text style={styles.label}>Sign up as</Text>
      <RoleSelector role={role} onChange={setRole} />

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
        maxLength={11}
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!visible}
        style={styles.input}
      />
      <Text style={styles.hint}>
        {password.length} characters {password.length >= 8 ? '✅' : '(8 needed)'}
      </Text>

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry={!visible}
        style={styles.input}
      />

      <Pressable onPress={() => setVisible(!visible)}>
        <Text style={styles.link}>{visible ? 'Hide' : 'Show'} password</Text>
      </Pressable>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    gap: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  hint: {
    fontSize: 13,
    color: '#64748b',
    marginTop: -6,
  },
  link: {
    color: '#2563eb',
  },
  error: {
    color: '#dc2626',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
});