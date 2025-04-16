import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

 //AsyncStorage.clear()
  useEffect(() => {
    async function checkOnboarding() {
      const seen = await AsyncStorage.getItem('@letsgrad_onboarding_complete');
      setHasSeenOnboarding(seen === 'true');
    }
    checkOnboarding();
  }, []);

  
  if (hasSeenOnboarding === null) return null; // Wait for check
  
  return <Redirect href={hasSeenOnboarding ? '/get-started' : '/welcome'} />;
}