import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { CatLogo } from '../../assets/svgs/catLogo';

/**
 * A customizable header component with cat theming
 */
export const CatHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showLogo = false,
  transparent = false,
  logoSize = { width: 100, height: 30 },
  centerTitle = false,
  style
}) => {
  return (
    <>
      <StatusBar
        backgroundColor={transparent ? 'transparent' : colors.background}
        barStyle="light-content"
        translucent={transparent}
      />
      <View
        style={[
          styles.header,
          transparent && styles.transparentHeader,
          centerTitle && styles.centerTitle,
          style
        ]}
      >
        {/* Left side - Back button or custom icon */}
        <View style={styles.leftContainer}>
          {leftIcon && (
            <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
              <Icon name={leftIcon} size={24} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Middle - Title or Logo */}
        <View style={styles.titleContainer}>
          {showLogo ? (
            <CatLogo height={logoSize.height} width={logoSize.width} />
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {/* Right side - Optional action button */}
        <View style={styles.rightContainer}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
              <Icon name={rightIcon} size={24} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  centerTitle: {
    justifyContent: 'center',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconButton: {
    padding: spacing.small,
  },
});

export default CatHeader;
