import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const VideoControls = ({
  isPlaying,
  duration,
  currentTime,
  onTogglePlay,
  onSeek,
  onBack,
  onToggleFullscreen,
  isFullscreen,
  quality
}) => {
  // Format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <View style={styles.container}>
      {/* Top controls */}
      <View style={styles.topControls}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.videoInfo}>
          <Text style={styles.videoQuality}>{quality}</Text>
        </View>
        
        <TouchableOpacity onPress={onToggleFullscreen} style={styles.fullscreenButton}>
          <Icon 
            name={isFullscreen ? "minimize" : "maximize"} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Center play/pause button */}
      <View style={styles.centerControls}>
        <TouchableOpacity 
          onPress={onTogglePlay}
          style={styles.playPauseButton}
        >
          <Icon 
            name={isPlaying ? "pause" : "play"} 
            size={40} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={currentTime}
          onValueChange={onSeek}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.backgroundTertiary}
          thumbTintColor={colors.primary}
        />
        
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
  },
  backButton: {
    padding: spacing.small,
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoQuality: {
    color: colors.text,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.small,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  fullscreenButton: {
    padding: spacing.small,
  },
  centerControls: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.medium,
  },
  timeText: {
    color: colors.text,
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: spacing.small,
  },
});

export default VideoControls;
