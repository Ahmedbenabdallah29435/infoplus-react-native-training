import { StyleSheet, Text, View } from 'react-native';
//comment
type ProfileProps = {
  title?: string;
  description: string;
  dark?: boolean;
};

const ProfileCardTest = ({ title, description, dark = false }: ProfileProps) => {
  return (
    <View style={[styles.card, { backgroundColor: dark ? '#2A3047' : '#ffffff' }]}>
      {title ? (
        <Text style={[styles.title, { color: dark ? '#90CAF9' : '#0D47A1' }]}>{title}</Text>
      ) : null}
      <Text style={[styles.description, { color: dark ? '#B0B8D0' : '#666' }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProfileCardTest;
