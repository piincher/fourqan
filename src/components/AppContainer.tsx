import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

const AppContainer: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>uploda</Text>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
