import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const VideoInfo = ({ video }) => {
  if (!video) return null;

  // Organize categories for display
  const renderCategories = () => {
    if (!video.categories || video.categories.length === 0) {
      return null;
    }

    return (
      <View style={styles.categoriesContainer}>
        {video.categories.map((category, index) => (
          <View key={index} style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {video.description || 'No description available.'}
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Icon name="eye" size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>
            {video.viewsCount?.toLocaleString() || '0'} views
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Icon name="heart" size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>
            {video.likesCount?.toLocaleString() || '0'} likes
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Icon name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>{video.year}</Text>
        </View>
      </View>
      
      {renderCategories()}
      
      <View style={styles.separator} />
      
      <View style={styles.qualityContainer}>
        <Text style={styles.sectionTitle}>Available Quality</Text>
        <View style={styles.qualityBadges}>
          {video.qualities?.map((quality, index) => (
            <View 
              key={index} 
              style={[
                styles.qualityBadge,
                quality === '4K' && styles.highQualityBadge
              ]}
            >
              <Text style={styles.qualityText}>{quality}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {video.director && (
        <View style={styles.creditSection}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.creditText}>{video.director.name}</Text>
        </View>
      )}
      
      {video.cast && video.cast.length > 0 && (
        <View style={styles.creditSection}>
          <Text style={styles.sectionTitle}>Cast</Text>
          <Text style={styles.creditText}>
            {video.cast.map(actor => actor.name).join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.small,
  },
  description: {
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.medium,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  statText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: spacing.small,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.medium,
  },
  categoryBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
    borderRadius: 4,
    marginRight: spacing.small,
    marginBottom: spacing.small,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.backgroundSecondary,
    marginVertical: spacing.medium,
  },
  qualityContainer: {
    marginBottom: spacing.medium,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  qualityBadges: {
    flexDirection: 'row',
  },
  qualityBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
    borderRadius: 4,
    marginRight: spacing.small,
  },
  highQualityBadge: {
    backgroundColor: colors.primary,
  },
  qualityText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  creditSection: {
    marginBottom: spacing.medium,
  },
  creditText: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default VideoInfo;
