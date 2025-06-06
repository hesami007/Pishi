import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Ignore specific warnings that might appear during development
LogBox.ignoreLogs([
  'Reanimated 2',
  'AsyncStorage has been extracted',
  'VirtualizedLists should never be nested'
]);

// Cat emoji symbol for our theme
export const CAT_EMOJI = '🐱';

// Component that uses the theme context
const ThemedApp = () => {
  const { themeObj } = useTheme();
  
  return (
    <NavigationContainer theme={themeObj}>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
