import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

/**
 * CommentItem - Displays a single comment with replies
 */
const CommentItem = ({ comment, onVideoPress, onReplyPress, onDeletePress }) => {
  const { theme, styles } = useTheme();
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <View style={[
      localStyles.commentItem,
      { borderBottomColor: theme === 'dark' ? '#333333' : '#EEEEEE' }
    ]}>
      {/* Video thumbnail and info */}
      <TouchableOpacity 
        style={localStyles.videoInfo}
        onPress={() => onVideoPress(comment.videoId)}
      >
        <Image 
          source={{ uri: comment.videoThumbnail || `https://picsum.photos/300/200?random=${comment.videoId}` }}
          style={localStyles.thumbnail}
        />
        <View style={localStyles.videoDetails}>
          <Text 
            style={[
              localStyles.videoTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
            ]}
            numberOfLines={1}
          >
            {comment.videoTitle}
          </Text>
          <Text 
            style={[
              localStyles.timestamp,
              { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
            ]}
          >
            {new Date(comment.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Comment content */}
      <View style={localStyles.commentBody}>
        <Text style={[
          localStyles.commentText,
          { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
        ]}>
          {comment.text}
        </Text>
        
        {/* Comment actions */}
        <View style={localStyles.commentActions}>
          <TouchableOpacity 
            style={localStyles.actionButton}
            onPress={onReplyPress}
          >
            <Text style={[
              localStyles.actionText,
              { color: theme === 'dark' ? '#1E88E5' : '#1976D2' }
            ]}>
              Reply
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={localStyles.actionButton}
            onPress={() => onDeletePress(comment.id)}
          >
            <Text style={[
              localStyles.actionText,
              { color: theme === 'dark' ? '#F44336' : '#D32F2F' }
            ]}>
              Delete
            </Text>
          </TouchableOpacity>
          
          {comment.replies && comment.replies.length > 0 && (
            <TouchableOpacity 
              style={localStyles.actionButton}
              onPress={toggleReplies}
            >
              <Text style={[
                localStyles.actionText,
                { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
              ]}>
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Replies */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <View style={[
          localStyles.repliesContainer,
          { backgroundColor: theme === 'dark' ? '#252525' : '#F8F8F8' }
        ]}>
          <FlatList
            data={comment.replies}
            renderItem={({ item: reply }) => (
              <View style={localStyles.replyItem}>
                <View style={localStyles.replyHeader}>
                  <Image 
                    source={{ uri: reply.user.avatar || `https://ui-avatars.com/api/?name=${reply.user.username}&background=random` }}
                    style={localStyles.replyAvatar}
                  />
                  <Text style={{ 
                    fontWeight: 'bold',
                    marginRight: 5,
                    color: theme === 'dark' ? '#FFFFFF' : '#212121'
                  }}>
                    {reply.user.username} {CAT_EMOJI}
                  </Text>
                  <Text style={{ 
                    fontSize: 12,
                    color: theme === 'dark' ? '#A0A0A0' : '#757575'
                  }}>
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={{ 
                  marginTop: 4,
                  color: theme === 'dark' ? '#E0E0E0' : '#424242'
                }}>
                  {reply.text}
                </Text>
              </View>
            )}
            keyExtractor={(item) => `reply-${item.id}`}
          />
        </View>
      )}
    </View>
  );
};

/**
 * CommentManagement component - Shows all user comments with their replies
 * @param {array} comments - List of user's comments
 * @param {function} onVideoPress - Function to navigate to video
 * @param {function} onReplyPress - Function to reply to a comment
 * @param {function} onDeletePress - Function to delete a comment
 */
const CommentManagement = ({ comments = [], onVideoPress, onReplyPress, onDeletePress }) => {
  const { theme, styles } = useTheme();

  if (!comments || comments.length === 0) {
    return (
      <View style={[
        localStyles.emptyContainer,
        { backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F5F5F5' }
      ]}>
        <Text style={{ color: theme === 'dark' ? '#A0A0A0' : '#757575' }}>
          You haven't made any comments yet {CAT_EMOJI}
        </Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      <Text style={[
        localStyles.sectionTitle,
        { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
      ]}>
        Your Comments {CAT_EMOJI}
      </Text>
      
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            onVideoPress={onVideoPress}
            onReplyPress={() => onReplyPress(item)}
            onDeletePress={onDeletePress}
          />
        )}
        keyExtractor={(item) => `comment-${item.id}`}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  commentItem: {
    padding: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  videoInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  thumbnail: {
    width: 80,
    height: 45,
    borderRadius: 4,
  },
  videoDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  commentBody: {
    marginTop: 8,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  repliesContainer: {
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
  },
  replyItem: {
    padding: 8,
    marginBottom: 8,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
});

export default CommentManagement;