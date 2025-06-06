import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

/**
 * PlaylistCard component - Displays a playlist in Instagram/SoundCloud style
 * @param {object} playlist - Playlist data
 * @param {function} onPress - Function to call when the playlist is pressed
 * @param {boolean} isUserPlaylist - Whether this playlist belongs to the current user
 */
const PlaylistCard = ({ playlist, onPress, isUserPlaylist = false }) => {
  const { styles, theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.playlistCard, localStyles.container]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Playlist header with user info */}
      <View style={styles.playlistHeader}>
        <TouchableOpacity onPress={() => {/* Navigate to user profile */}}>
          <Image 
            source={{ uri: playlist.user?.avatar || `https://ui-avatars.com/api/?name=${playlist.user?.username || 'User'}&background=random` }} 
            style={localStyles.avatar} 
          />
        </TouchableOpacity>
        
        <View style={localStyles.headerInfo}>
          <TouchableOpacity onPress={() => {/* Navigate to user profile */}}>
            <Text style={[localStyles.username, { color: theme === 'dark' ? '#FFFFFF' : '#212121' }]}>
              {playlist.user?.username || 'User'} {CAT_EMOJI}
            </Text>
          </TouchableOpacity>
          <Text style={[localStyles.date, { color: theme === 'dark' ? '#A0A0A0' : '#757575' }]}>
            {new Date(playlist.createdAt).toLocaleDateString()}
          </Text>
        </View>
        
        {isUserPlaylist && (
          <TouchableOpacity style={localStyles.moreButton}>
            <Text style={{ color: theme === 'dark' ? '#FFFFFF' : '#212121' }}>•••</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Playlist cover image */}
      <Image 
        source={{ uri: playlist.coverImage || `https://picsum.photos/500/500?random=${playlist.id}` }} 
        style={styles.playlistCover}
        resizeMode="cover"
      />
      
      {/* Playlist footer with title, description and actions */}
      <View style={styles.playlistFooter}>
        <Text style={[localStyles.title, { color: theme === 'dark' ? '#FFFFFF' : '#212121' }]}>
          {playlist.title}
        </Text>
        
        {playlist.description && (
          <Text 
            style={[localStyles.description, { color: theme === 'dark' ? '#A0A0A0' : '#757575' }]}
            numberOfLines={2}
          >
            {playlist.description}
          </Text>
        )}
        
        {/* Stats row (videos count, likes, etc.) */}
        <View style={styles.playlistStats}>
          <Text style={{ color: theme === 'dark' ? '#A0A0A0' : '#757575' }}>
            {playlist.videoCount || 0} videos
          </Text>
          <View style={localStyles.statsRight}>
            <TouchableOpacity style={localStyles.iconButton}>
              <Text style={localStyles.iconText}>❤️ {playlist.likeCount || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.iconButton}>
              <Text style={localStyles.iconText}>💬 {playlist.commentCount || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.iconButton}>
              <Text style={localStyles.iconText}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
  },
  moreButton: {
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  statsRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  iconText: {
    fontSize: 14,
  },
});

export default PlaylistCard;