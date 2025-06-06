import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

/**
 * FollowRequestItem component - Displays a follow request notification
 * @param {object} request - Follow request data
 * @param {function} onAccept - Function to call when accept button is pressed
 * @param {function} onReject - Function to call when reject button is pressed
 * @param {function} onUserPress - Function to call when user avatar/name is pressed
 */
const FollowRequestItem = ({ request, onAccept, onReject, onUserPress }) => {
  const { styles, theme } = useTheme();
  
  return (
    <View style={[styles.notificationItem, localStyles.container]}>
      {/* User avatar */}
      <TouchableOpacity onPress={() => onUserPress(request.user.id)}>
        <Image 
          source={{ uri: request.user.avatar || `https://ui-avatars.com/api/?name=${request.user.username}&background=random` }} 
          style={localStyles.avatar} 
        />
      </TouchableOpacity>
      
      {/* Request details */}
      <View style={localStyles.content}>
        <TouchableOpacity onPress={() => onUserPress(request.user.id)}>
          <Text style={[localStyles.username, { color: theme === 'dark' ? '#FFFFFF' : '#212121' }]}>
            {request.user.username} {CAT_EMOJI}
          </Text>
        </TouchableOpacity>
        
        <Text style={[localStyles.message, { color: theme === 'dark' ? '#A0A0A0' : '#757575' }]}>
          wants to follow you
        </Text>
        
        <Text style={[localStyles.time, { color: theme === 'dark' ? '#6A6A6A' : '#9E9E9E' }]}>
          {new Date(request.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      {/* Action buttons */}
      <View style={localStyles.actions}>
        <TouchableOpacity 
          style={[
            localStyles.button, 
            localStyles.acceptButton, 
            { backgroundColor: theme === 'dark' ? '#1E88E5' : '#1976D2' }
          ]} 
          onPress={() => onAccept(request.id)}
        >
          <Text style={localStyles.buttonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            localStyles.button, 
            localStyles.rejectButton, 
            { 
              backgroundColor: 'transparent',
              borderColor: theme === 'dark' ? '#505050' : '#BDBDBD',
            }
          ]} 
          onPress={() => onReject(request.id)}
        >
          <Text style={{ 
            color: theme === 'dark' ? '#FFFFFF' : '#212121',
            fontWeight: '500',
            fontSize: 13,
          }}>
            Reject
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  acceptButton: {
    elevation: 1,
  },
  rejectButton: {
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 13,
  },
});

export default FollowRequestItem;