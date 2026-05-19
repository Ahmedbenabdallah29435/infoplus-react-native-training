import ProfileCard from '@/components/ProfileCard';
import ProfileCardTest from '@/components/ProfileCardTest';
import UserDemo from '@/components/UserDemo';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfilScreen() {
  const insets = useSafeAreaInsets();
  const { dark, toggleDark } = useTheme();
  const playClick = useClickSound();
  const { session } = useAuth();

  const userEmail = session?.user?.email ?? '';
  const userInitial = userEmail.charAt(0).toUpperCase() || '?';
  const createdAt = session?.user?.created_at
    ? new Date(session.user.created_at).toLocaleDateString('fr-FR')
    : '—';

  const doLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      if (Platform.OS === 'web') window.alert(error.message);
      else Alert.alert('Erreur', error.message);
    }
  };

  const handleLogout = () => {
    playClick();
    if (Platform.OS === 'web') {
      if (window.confirm('Tu veux vraiment te déconnecter ?')) {
        doLogout();
      }
    } else {
      Alert.alert('Déconnexion', 'Tu veux vraiment te déconnecter ?', [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Se déconnecter', style: 'destructive', onPress: doLogout },
      ]);
    }
  };
  const [nom, setNom] = useState('Ahmed Ben Salah');
  const [bio, setBio] = useState('Étudiant en développement mobile');
  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const textColor = dark ? '#FFFFFF' : '#333333';
  const inputBg = dark ? '#1A1F36' : '#fff';
  const inputBorder = dark ? '#3A4060' : '#ccc';
  const colors = ['#0D47A1', '#1976D2', '#1565C0', '#0277BD'];
  const [competences, setCompetences] = useState([
    'React Native',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',
    'Git & GitHub',
    'Gitlab',
    'CI/CD',
    'Agile Methodologies',
    'UI/UX Design',
    'Testing & Debugging',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim() === '') return;
    if (competences.includes(newSkill)) return;

    setCompetences([...competences, newSkill]);
    setNewSkill('');
  };
  const removeSkill = (skill: string) => {
    setCompetences(competences.filter((c) => c !== skill));
  };
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.headerTitle}>Mon Profil</Text>
          <Pressable
            onPress={() => {
              playClick();
              toggleDark();
            }}
            style={({ pressed }) => [styles.themeBtn, pressed && styles.pressed]}
          >
            <Text style={styles.themeBtnText}>{dark ? '☀️ Clair' : '🌙 Sombre'}</Text>
          </Pressable>
        </View>

        <View style={[styles.authCard, { backgroundColor: dark ? '#2A3047' : '#fff' }]}>
          <View style={styles.authRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInitial}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={[styles.authEmail, { color: textColor }]} numberOfLines={1}>
                {userEmail || 'Utilisateur anonyme'}
              </Text>
              <Text style={[styles.authMeta, { color: dark ? '#9AA0B6' : '#666' }]}>
                Compte créé le {createdAt}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutBtn, pressed && styles.pressed]}
          >
            <Text style={styles.logoutBtnText}>🚪 Se déconnecter</Text>
          </Pressable>
        </View>

        <ProfileCard
          nom={nom}
          bio={bio}
          photo={require('@/assets/images/123.png')}
          dark={dark}
        />
        <View style={[styles.section, { backgroundColor: dark ? '#2A3047' : '#fff' }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Modifier mon profil</Text>
          <Text style={[styles.label, { color: textColor }]}>Nom</Text>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
            placeholder="Ton nom..."
            placeholderTextColor="#888"
            value={nom}
            onChangeText={setNom}
          />
          <Text style={[styles.label, { color: textColor }]}>Bio</Text>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
            placeholder="Ta bio..."
            placeholderTextColor="#888"
            value={bio}
            onChangeText={setBio}
          />
        </View>
        <ProfileCardTest
          dark={dark}
          description="Étudiant en développement mobile passionné par la création d'applications innovantes et performantes. Compétent en React Native, TypeScript, et JavaScript, avec une solide expérience en HTML/CSS et Git. Toujours à la recherche de nouveaux défis pour améliorer mes compétences et contribuer à des projets passionnants."
        />
        <View style={[styles.section, { backgroundColor: dark ? '#2A3047' : '#fff' }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Mes Compétences</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
              placeholder="Nouvelle compétence..."
              placeholderTextColor="#888"
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={addSkill}
            />
            <Pressable
              onPress={() => {
                playClick();
                addSkill();
              }}
              style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
            >
              <Text style={styles.addBtnText}>＋ Ajouter</Text>
            </Pressable>
          </View>
          <View style={styles.skillsContainer}>
            {competences.map((comp, index) => (
              <Pressable
                key={comp}
                onPress={() => removeSkill(comp)}
                style={({ pressed }) => [
                  styles.skillBadge,
                  { backgroundColor: colors[index % colors.length] },
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.skillText}>{comp} ✕</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <UserDemo dark={dark} />
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  themeBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  themeBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.97 }] },
  authCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  authRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  authEmail: { fontSize: 15, fontWeight: 'bold' },
  authMeta: { fontSize: 12, marginTop: 2 },
  logoutBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  logoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  section: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  inputFlex: { flex: 1, marginBottom: 0 },
  addBtn: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
