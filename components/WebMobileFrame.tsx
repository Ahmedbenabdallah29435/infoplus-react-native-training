import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const PHONE_WIDTH = 400;
const DESKTOP_BREAKPOINT = 768;

function AnimatedBackground() {
  const blob1X = useRef(new Animated.Value(0)).current;
  const blob1Y = useRef(new Animated.Value(0)).current;
  const blob2X = useRef(new Animated.Value(0)).current;
  const blob2Y = useRef(new Animated.Value(0)).current;
  const blob3X = useRef(new Animated.Value(0)).current;
  const blob3Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const drift = (val: Animated.Value, to: number, duration: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: to, duration, useNativeDriver: true }),
          Animated.timing(val, { toValue: 0, duration, useNativeDriver: true }),
        ])
      ).start();
    };
    drift(blob1X, 80, 12000);
    drift(blob1Y, 60, 14000);
    drift(blob2X, -100, 16000);
    drift(blob2Y, 80, 13000);
    drift(blob3X, 100, 18000);
    drift(blob3Y, -60, 15000);
  }, [blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[
          styles.blob,
          styles.blob1,
          { transform: [{ translateX: blob1X }, { translateY: blob1Y }] },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blob2,
          { transform: [{ translateX: blob2X }, { translateY: blob2Y }] },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blob3,
          { transform: [{ translateX: blob3X }, { translateY: blob3Y }] },
        ]}
      />
    </View>
  );
}

/**
 * On web AND a wide screen (desktop), constrains the whole app to a phone-sized
 * centered column on an animated gradient background. Above and below the
 * phone, project title + author credit are shown in their own space (never
 * overlapping the app). On native or narrow web, returns children unchanged.
 */
export default function WebMobileFrame({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= DESKTOP_BREAKPOINT;

  if (!isDesktopWeb) return <>{children}</>;

  return (
    <View style={styles.outer}>
      <AnimatedBackground />

      <View style={styles.topCredit}>
        <Text style={styles.topTitle}>📱 InfoPlus App</Text>
        <Text style={styles.topSubtitle}>React Native Training — Live Demo</Text>
      </View>

      <View style={styles.frame}>{children}</View>

      <View style={styles.bottomCredit}>
        <Text style={styles.bottomText}>
          Made with <Text style={styles.heart}>❤</Text> by{' '}
          <Text style={styles.author}>Ahmed Ben Abdallah</Text>
        </Text>
        <Text style={styles.bottomSubtext}>React Native Instructor · InfoPlus Bizerte</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0A0E1F',
    overflow: 'hidden',
    paddingVertical: 20,
  },
  blob: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    opacity: 0.35,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(100px)' } as object) : null),
  },
  blob1: { top: '5%', left: '0%', backgroundColor: '#0D47A1' },
  blob2: { top: '35%', right: '0%', backgroundColor: '#9C27B0' },
  blob3: { bottom: '0%', left: '25%', backgroundColor: '#00BCD4' },
  topCredit: {
    alignItems: 'center',
    marginBottom: 12,
  },
  topTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  topSubtitle: {
    color: '#90CAF9',
    fontSize: 13,
    marginTop: 4,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_WIDTH,
    backgroundColor: '#F0F4F8',
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
          borderRadius: 16,
        } as object)
      : null),
  },
  bottomCredit: {
    alignItems: 'center',
    marginTop: 12,
  },
  bottomText: {
    color: '#fff',
    fontSize: 14,
  },
  heart: { color: '#E91E63' },
  author: { fontWeight: 'bold', color: '#90CAF9' },
  bottomSubtext: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 4,
  },
});
