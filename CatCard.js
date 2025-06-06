import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * A customizable card component with cat theming
 */
export const CatCard = ({
  title,
  subtitle,
  image,
  icon,
  onPress,
  children,
  footer,
  badges = [],
  elevated = true,
  bordered = false,
  style,
  imageStyle,
  contentStyle,
}) => {
  // Determine card styling
  const cardStyles = [
    styles.card,
    elevated && styles.elevated,
    bordered && styles.bordered,
    style,
  ];

  // Render optional badges
  const renderBadges = () => {
    if (badges.length === 0) return null;

    return (
      <View style={styles.badgeContainer}>
        {badges.map((badge, index) => (
          <View 
            key={index} 
            style={[
              styles.badge, 
              { backgroundColor: badge.color || colors.primary }
            ]}
          >
            <Text style={styles.badgeText}>{badge.text}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render the card
  const renderCard = () => (
    <View style={cardStyles}>
      {/* Optional Image */}
      {image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={[styles.image, imageStyle]} 
            resizeMode="cover"
          />
          {renderBadges()}
        </View>
      )}
      
      {/* Card Content */}
      <View style={[styles.content, contentStyle]}>
        {/* Header */}
        {(title || subtitle) && (
          <View style={styles.header}>
            {icon && (
              <Icon 
                name={icon} 
                size={24} 
                color={colors.primary} 
                style={styles.icon} 
              />
            )}
            <View style={styles.headerText}>
              {title && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>
        )}
        
        {/* Main Content */}
        {children}
      </View>
      
      {/* Optional Footer */}
      {footer && (
        <View style={styles.footer}>
          {footer}
        </View>
      )}
    </View>
  );

  // Return as touchable if onPress exists, otherwise as regular view
  return onPress ? (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      {renderCard()}
    </TouchableOpacity>
  ) : renderCard();
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.borderRadiusLarge,
    overflow: 'hidden',
    marginBottom: spacing.medium,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.small,
    left: spacing.small,
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
    borderRadius: spacing.borderRadiusSmall,
    marginRight: spacing.xsmall,
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: spacing.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  icon: {
    marginRight: spacing.small,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.medium,
  },
});

export default CatCard;
