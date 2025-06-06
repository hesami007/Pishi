import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

const ThemeToggle = ({ label }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[
          styles.label,
          { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
        ]}>
          {label || 'Dark Mode'}
        </Text>
        <Text style={styles.emoji}>
          {theme === 'dark' ? '🌙' : '☀️'} {CAT_EMOJI}
        </Text>
      </View>
      
      <Switch
        value={theme === 'dark'}
        onValueChange={toggleTheme}
        trackColor={{ 
          false: '#D1D1D1', 
          true: theme === 'dark' ? '#1976D2' : '#2196F3' 
        }}
        thumbColor={theme === 'dark' ? '#64B5F6' : '#BBDEFB'}
        ios_backgroundColor="#D1D1D1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  emoji: {
    fontSize: 16,
  }
});

export default ThemeToggle;