import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import AnimatedSplash from '@/components/AnimatedSplash';
import Onboarding from '@/components/Onboarding';
import WebMobileFrame from '@/components/WebMobileFrame';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/lib/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function OnboardingOverlay() {
  const { showing, hide } = useOnboarding();
  if (!showing) return null;
  return <Onboarding onFinish={hide} />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <OnboardingProvider>
            <NavThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <WebMobileFrame>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen name="signup" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
                <StatusBar style="auto" />
                <OnboardingOverlay />
                {!splashDone && <AnimatedSplash onFinish={() => setSplashDone(true)} />}
              </WebMobileFrame>
            </NavThemeProvider>
          </OnboardingProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
