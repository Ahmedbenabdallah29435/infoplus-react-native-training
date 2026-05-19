import { useClickSound } from '@/hooks/useClickSound';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type Step = {
  emoji: string;
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    emoji: '🎓',
    title: 'Bienvenue chez InfoPlus',
    description:
      'Ton centre de formation à Bizerte depuis 1995. Plus de 5000 diplômés nous ont fait confiance.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
  },
  {
    emoji: '📚',
    title: 'Découvre nos formations',
    description:
      'BTP, BTS, Commerce, Infographie, Développement Web & Mobile — trouve la formation faite pour toi.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
  },
  {
    emoji: '📝',
    title: 'Inscris-toi en un clic',
    description:
      'Choisis ta formation, remplis le formulaire d\'inscription et lance ta carrière professionnelle.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  },
  {
    emoji: '👤',
    title: 'Gère ton profil',
    description:
      'Personnalise ton profil, ajoute tes compétences et suis ton parcours directement depuis l\'app.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
  },
];

type Props = { onFinish: () => void };

export default function Onboarding({ onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const playClick = useClickSound();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Step>>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  const goNext = () => {
    playClick();
    if (index < steps.length - 1) {
      listRef.current?.scrollToOffset({ offset: (index + 1) * width, animated: true });
    } else {
      onFinish();
    }
  };

  const skip = () => {
    playClick();
    onFinish();
  };

  const isLast = index === steps.length - 1;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={skip}
        style={({ pressed }) => [
          styles.skipBtn,
          { top: insets.top + 12 },
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.skipText}>Passer →</Text>
      </Pressable>

      <FlatList
        ref={listRef}
        data={steps}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.imageWrap, { marginTop: insets.top + 60 }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.imageOverlay} />
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.dots}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <Pressable
          onPress={goNext}
          style={({ pressed }) => [styles.nextBtn, pressed && styles.pressed]}
        >
          <Text style={styles.nextBtnText}>{isLast ? 'Commencer' : 'Suivant →'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D47A1',
    zIndex: 999,
    elevation: 999,
  },
  skipBtn: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.97 }] },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  imageWrap: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  image: { width: '100%', height: '100%' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,71,161,0.5)',
  },
  emoji: { fontSize: 80, position: 'absolute' },
  textWrap: { alignItems: 'center' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#90CAF9',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  nextBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: { color: '#0D47A1', fontSize: 16, fontWeight: 'bold' },
});
