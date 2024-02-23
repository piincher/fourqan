import AppContainer from '@components/AppContainer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useFont } from 'src/hooks/useFont';
import Index from 'src/navigation/Index';
import store from 'src/store';

const App = () => {
  const { loadFonts } = useFont();
  if (!loadFonts) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContainer>
          <Index />
        </AppContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
