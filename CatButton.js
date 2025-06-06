import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * A customized button component with cat theming
 */
export const CatButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  variant = 'filled', // 'filled', 'outlined', 'text'
  size = 'medium', // 'small', 'medium', 'large'
}) => {
  // Determine button styles based on props
  const buttonStyles = [
    styles.button,
    variant === 'outlined' && styles.outlinedButton,
    variant === 'text' && styles.textButton,
    size === 'small' && styles.smallButton,
    size === 'large' && styles.largeButton,
    disabled && styles.disabledButton,
    style
  ];

  // Determine text styles based on props
  const buttonTextStyles = [
    styles.buttonText,
    variant === 'outlined' && styles.outlinedButtonText,
    variant === 'text' && styles.textButtonText,
    size === 'small' && styles.smallButtonText,
    size === 'large' && styles.largeButtonText,
    disabled && styles.disabledButtonText,
    textStyle
  ];

  // Render loader if loading
  if (loading) {
    return (
      <TouchableOpacity 
        style={buttonStyles} 
        disabled={true}
      >
        <ActivityIndicator size="small" color={variant === 'filled' ? colors.text : colors.primary} />
      </TouchableOpacity>
    );
  }

  // Render button with content
  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
          color={variant === 'filled' ? colors.text : colors.primary} 
          style={styles.leftIcon}
        />
      )}
      
      <Text style={buttonTextStyles}>{title}</Text>
      
      {icon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
          color={variant === 'filled' ? colors.text : colors.primary} 
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.borderRadiusMedium,
    minWidth: 100,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.small,
    minWidth: 0,
  },
  smallButton: {
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    minWidth: 80,
  },
  largeButton: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
  },
  disabledButton: {
    backgroundColor: colors.inactive,
    borderColor: colors.inactive,
    opacity: 0.6,
  },
  buttonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  outlinedButtonText: {
    color: colors.primary,
  },
  textButtonText: {
    color: colors.primary,
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    color: colors.textSecondary,
  },
  leftIcon: {
    marginRight: spacing.small,
  },
  rightIcon: {
    marginLeft: spacing.small,
  },
});

export default CatButton;
