import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import VideoThumbnail from './VideoThumbnail';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width } = Dimensions.get('window');
const THUMBNAIL_WIDTH = Math.min(160, width / 2.5);

const CategoryRow = ({ title, videos, onViewMore, onVideoPress }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.viewMore} onPress={onViewMore}>
          <Text style={styles.viewMoreText}>View All</Text>
          <Icon name="chevron-right" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video) => (
          <VideoThumbnail
            key={video.id}
            video={video}
            onPress={() => onVideoPress(video)}
            width={THUMBNAIL_WIDTH}
            style={styles.thumbnail}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.small,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    color: colors.primary,
    marginRight: 4,
  },
  scrollContent: {
    paddingHorizontal: spacing.medium,
  },
  thumbnail: {
    marginRight: spacing.medium,
  },
});

export default CategoryRow;
