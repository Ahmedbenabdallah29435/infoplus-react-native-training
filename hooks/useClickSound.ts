import { useAudioPlayer } from 'expo-audio';
import { Platform } from 'react-native';

const CLICK_SOUND_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_d22b2c4dfb.mp3';

// On web the click sound URL is unreliable (CORS / rate-limit / 403 from hotlink
// protection) and produces console errors. Skip loading audio on web entirely
// until a local asset is bundled. On native it works fine.
const audioSource = Platform.OS === 'web' ? null : { uri: CLICK_SOUND_URL };

export function useClickSound() {
  const player = useAudioPlayer(audioSource);

  return () => {
    if (Platform.OS === 'web') return;
    try {
      player.seekTo(0);
      player.play();
    } catch {
      // ignore — sound is non-critical
    }
  };
}
