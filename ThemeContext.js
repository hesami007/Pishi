import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the theme context
const ThemeContext = createContext();

// Theme colors
const darkTheme = {
  colors: {
    primary: '#1E88E5',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#A0A0A0',
    border: '#333333',
    notification: '#FF4081',
  },
  dark: true,
};

const lightTheme = {
  colors: {
    primary: '#1976D2',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#212121',
    secondaryText: '#757575',
    border: '#DDDDDD',
    notification: '#E91E63',
  },
  dark: false,
};

// Custom styles for dark/light modes
const getStyles = (theme) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? darkTheme.colors.background : lightTheme.colors.background,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme === 'dark' ? darkTheme.colors.text : lightTheme.colors.text,
    },
    secondaryText: {
      color: theme === 'dark' ? darkTheme.colors.secondaryText : lightTheme.colors.secondaryText,
    },
    card: {
      backgroundColor: theme === 'dark' ? darkTheme.colors.card : lightTheme.colors.card,
      borderColor: theme === 'dark' ? darkTheme.colors.border : lightTheme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    button: {
      backgroundColor: theme === 'dark' ? darkTheme.colors.primary : lightTheme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: theme === 'dark' ? '#2C2C2C' : '#F5F5F5',
      borderColor: theme === 'dark' ? '#333333' : '#DDDDDD',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: theme === 'dark' ? '#FFFFFF' : '#212121',
    },
  };
};

export const ThemeProvider = ({ children }) => {
  // Get device theme
  const deviceTheme = useColorScheme();
  
  // State for current theme
  const [theme, setTheme] = useState('dark'); // Default to dark theme
  
  // Load saved theme on component mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        } else {
          // If no saved theme, use device theme
          setTheme(deviceTheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    
    loadTheme();
  }, [deviceTheme]);
  
  // Save theme to AsyncStorage when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('@theme', theme);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };
    
    saveTheme();
  }, [theme]);
  
  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  // Get current theme object for React Navigation
  const themeObj = theme === 'dark' ? darkTheme : lightTheme;
  
  // Get custom styles for current theme
  const styles = getStyles(theme);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeObj, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};