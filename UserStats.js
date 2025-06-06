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

const UserStats = ({ 
  followersCount, 
  followingCount, 
  watchedCount, 
  playlistsCount,
  onFollowersPress,
  onFollowingPress,
  onWatchedPress,
  onPlaylistsPress
}) => {
  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.statItem} onPress={onFollowersPress}>
        <Text style={styles.statNumber}>{formatNumber(followersCount)}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.statItem} onPress={onFollowingPress}>
        <Text style={styles.statNumber}>{formatNumber(followingCount)}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.statItem} onPress={onWatchedPress}>
        <Text style={styles.statNumber}>{formatNumber(watchedCount)}</Text>
        <Text style={styles.statLabel}>Watched</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.statItem} onPress={onPlaylistsPress}>
        <Text style={styles.statNumber}>{formatNumber(playlistsCount)}</Text>
        <Text style={styles.statLabel}>Playlists</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.medium,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    marginHorizontal: spacing.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});

export default UserStats;
