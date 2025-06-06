import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { CatPaw } from '../../assets/svgs/catPaw';

/**
 * A cat-themed loading spinner
 */
export const CatLoader = ({ 
  size = 'medium', 
  message = '', 
  fullScreen = false,
  color = colors.primary 
}) => {
  // Get appropriate size value
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      case 'medium':
      default:
        return 36;
    }
  };

  // Determine container style
  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen
  ];

  // Show the cat paw logo spinning
  return (
    <View style={containerStyle}>
      <View style={styles.loaderContainer}>
        <View style={[styles.spinner, { width: getSize(), height: getSize() }]}>
          <CatPaw width={getSize()} height={getSize()} color={color} />
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    alignItems: 'center',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: spacing.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  '@keyframes spin': {
    from: {
      transform: [{ rotate: '0deg' }],
    },
    to: {
      transform: [{ rotate: '360deg' }],
    },
  },
});

export default CatLoader;
