import AppHeader from '@/components/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { supabase } from '@/lib/supabase';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();
  const { dark } = useTheme();
  const playClick = useClickSound();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const cardBg = dark ? '#2A3047' : '#fff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#333';
  const mutedColor = dark ? '#9AA0B6' : '#666';
  const inputBg = dark ? '#1A1F36' : '#F7F9FC';
  const inputBorder = dark ? '#3A4060' : '#E0E6ED';

  const handleLogin = async () => {
    playClick();
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplis tous les champs');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      Alert.alert('Erreur', 'Email invalide');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Login échoué', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleForgotPassword = async () => {
    playClick();
    if (!EMAIL_REGEX.test(email)) {
      Alert.alert('Email requis', 'Saisis ton email pour recevoir le lien de réinitialisation.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('Email envoyé', 'Vérifie ta boîte mail pour réinitialiser ton mot de passe.');
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <AppHeader title="Connexion" showBack={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoWrap}>
            <Image source={require('@/assets/images/123.png')} style={styles.logo} />
          </View>
          <Text style={[styles.title, { color: titleColor }]}>Bon retour 👋</Text>
          <Text style={[styles.subtitle, { color: mutedColor }]}>
            Connecte-toi à ton compte InfoPlus
          </Text>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.label, { color: textColor }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              value={email}
              onChangeText={setEmail}
              placeholder="ton@email.com"
              placeholderTextColor={dark ? '#7A82A0' : '#999'}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: textColor }]}>Mot de passe</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={dark ? '#7A82A0' : '#999'}
              secureTextEntry
            />

            <Pressable onPress={handleForgotPassword} hitSlop={6} style={styles.forgotWrap}>
              <Text style={[styles.forgotText, { color: titleColor }]}>Mot de passe oublié ?</Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.btnText}>{loading ? 'Connexion...' : 'Se connecter'}</Text>
          </Pressable>

          <Link href="/signup" asChild>
            <Pressable style={styles.link} onPress={playClick}>
              <Text style={[styles.linkText, { color: titleColor }]}>
                Pas de compte ? <Text style={{ fontWeight: 'bold' }}>Inscris-toi</Text>
              </Text>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: 16 },
  logo: { width: 100, height: 100, borderRadius: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, marginBottom: 20, textAlign: 'center' },
  card: {
    padding: 18,
    borderRadius: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 6, marginTop: 12 },
  input: {
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  forgotWrap: { alignSelf: 'flex-end', marginTop: 10 },
  forgotText: { fontSize: 13, fontWeight: '600' },
  btn: {
    backgroundColor: '#0D47A1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { alignSelf: 'center', marginTop: 20, padding: 8 },
  linkText: { fontSize: 14 },
});
