import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const PlaylistItem = ({ 
  playlist, 
  onPress, 
  onOptionsPress,
  showOptions = true,
}) => {
  if (!playlist) return null;
  
  const { title, description, videos, coverImage, isPrivate } = playlist;
  
  // Format video count text
  const videoCountText = videos && videos.length === 1 
    ? '1 video' 
    : `${videos ? videos.length : 0} videos`;
    
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {coverImage ? (
          <Image 
            source={{ uri: coverImage }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="film" size={30} color={colors.textSecondary} />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {isPrivate && (
            <Icon name="lock" size={14} color={colors.textSecondary} style={styles.lockIcon} />
          )}
        </View>
        
        {description ? (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
        
        <Text style={styles.videoCount}>
          {videoCountText}
        </Text>
      </View>
      
      {showOptions && (
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={() => onOptionsPress(playlist)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Icon name="more-vertical" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.small,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginBottom: spacing.small,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.backgroundTertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: spacing.medium,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    flex: 1,
  },
  lockIcon: {
    marginLeft: spacing.small,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.small,
  },
  videoCount: {
    color: colors.textTertiary,
    fontSize: 12,
  },
  optionsButton: {
    paddingHorizontal: spacing.small,
    justifyContent: 'center',
  },
});

export default PlaylistItem;