import { NavigationContainer } from '@react-navigation/native';
import { SupabaseProvider } from 'context/SupabaseProvider';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFont } from 'src/hooks/useFont';
import { AuthNavigator } from 'src/navigation/AuthNavigation';

const App = () => {
  const { loadFonts } = useFont();
  if (!loadFonts) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SupabaseProvider>
          <AuthNavigator />
        </SupabaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
