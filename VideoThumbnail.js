import React from 'react';
import { 
  TouchableOpacity, 
  Image, 
  Text, 
  View, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const VideoThumbnail = ({ 
  video, 
  onPress, 
  width = 160, 
  showInfo = true,
  style 
}) => {
  if (!video) return null;

  const { title, thumbnail, year, rating, duration, likesCount } = video;
  
  // Maintain 16:9 aspect ratio for thumbnails
  const height = width * (9 / 16);
  const thumbnailContainerStyle = { width, height };

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.container, style, { width }]}
      activeOpacity={0.8}
    >
      <View style={[styles.thumbnailContainer, thumbnailContainerStyle]}>
        <Image 
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        
        {duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}
      </View>
      
      {showInfo && (
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          
          <View style={styles.metaContainer}>
            {rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
            )}
            
            {year && (
              <Text style={styles.yearText}>{year}</Text>
            )}
            
            {likesCount && (
              <View style={styles.likesContainer}>
                <Icon name="heart" size={10} color={colors.primary} />
                <Text style={styles.likesText}>{likesCount}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.small,
  },
  thumbnailContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.backgroundSecondary,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.xsmall,
    right: spacing.xsmall,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.xsmall,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: colors.text,
    fontSize: 10,
  },
  info: {
    marginTop: spacing.xsmall,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingContainer: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginRight: spacing.xsmall,
  },
  ratingText: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  yearText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginRight: spacing.xsmall,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginLeft: 2,
  },
});

export default VideoThumbnail;
