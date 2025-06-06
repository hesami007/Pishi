import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { CatPaw } from '../../assets/svgs/catPaw';

/**
 * A cat-themed avatar component
 */
export const CatAvatar = ({ 
  uri, 
  size = 50, 
  name = '', 
  backgroundColor = colors.primary,
  borderColor = colors.background,
  showBorder = true,
  style
}) => {
  // Generate initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
      return `${nameArray[0].charAt(0)}${nameArray[1].charAt(0)}`;
    }
    return nameArray[0].charAt(0);
  };
  
  // Determine if we should show the image, initials, or default icon
  const renderContent = () => {
    if (uri) {
      return (
        <Image 
          source={{ uri }} 
          style={[
            styles.image, 
            { width: size, height: size, borderRadius: size / 2 }
          ]}
          resizeMode="cover"
        />
      );
    } else if (name) {
      return (
        <View 
          style={[
            styles.initialsContainer, 
            { 
              width: size, 
              height: size, 
              borderRadius: size / 2,
              backgroundColor
            }
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
            {getInitials()}
          </Text>
        </View>
      );
    } else {
      return (
        <View 
          style={[
            styles.defaultContainer, 
            { 
              width: size, 
              height: size, 
              borderRadius: size / 2,
              backgroundColor: colors.backgroundSecondary 
            }
          ]}
        >
          <CatPaw width={size * 0.6} height={size * 0.6} color={colors.textSecondary} />
        </View>
      );
    }
  };
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          borderWidth: showBorder ? 2 : 0,
          borderColor: borderColor
        },
        style
      ]}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.text,
    fontWeight: 'bold',
  },
  defaultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CatAvatar;
