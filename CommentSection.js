import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { CatAvatar } from '../UI/CatAvatar';

const CommentSection = ({ comments = [], onAddComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim().length > 0) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  // Limit comments initially to avoid overwhelming the view
  const visibleComments = showAllComments 
    ? comments 
    : comments.slice(0, 3);
  
  const remainingComments = comments.length - visibleComments.length;

  const renderComment = ({ item }) => {
    const { user, text, timestamp, likes } = item;
    
    return (
      <View style={styles.commentContainer}>
        <CatAvatar 
          uri={user.avatar} 
          size={40} 
          name={user.username} 
        />
        
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          
          <Text style={styles.commentText}>{text}</Text>
          
          <View style={styles.commentActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="heart" size={14} color={colors.textSecondary} />
              <Text style={styles.actionText}>{likes || 0}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="message-circle" size={14} color={colors.textSecondary} />
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
      
      {/* Comment input */}
      <View style={styles.inputContainer}>
        <CatAvatar 
          uri={currentUser?.avatar} 
          size={40} 
          name={currentUser?.username || 'User'} 
        />
        
        <TextInput
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Add a comment..."
          placeholderTextColor={colors.textSecondary}
          multiline
        />
        
        <TouchableOpacity 
          style={[
            styles.postButton,
            commentText.trim().length === 0 && styles.disabledButton
          ]}
          onPress={handleAddComment}
          disabled={commentText.trim().length === 0}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      
      {/* Comments list */}
      {comments.length > 0 ? (
        <>
          <FlatList
            data={visibleComments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
          
          {remainingComments > 0 && (
            <TouchableOpacity 
              style={styles.showMoreButton}
              onPress={() => setShowAllComments(true)}
            >
              <Text style={styles.showMoreText}>
                Show {remainingComments} more {remainingComments === 1 ? 'comment' : 'comments'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="message-circle" size={30} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.large,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.large,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    marginHorizontal: spacing.small,
    color: colors.text,
    minHeight: 40,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.xsmall,
    borderRadius: 16,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: colors.inactive,
  },
  postButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: spacing.medium,
  },
  commentContent: {
    flex: 1,
    marginLeft: spacing.small,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: spacing.small,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  username: {
    color: colors.text,
    fontWeight: '500',
  },
  timestamp: {
    color: colors.textTertiary,
    fontSize: 12,
  },
  commentText: {
    color: colors.text,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: spacing.small,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  actionText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  showMoreButton: {
    padding: spacing.small,
    alignItems: 'center',
  },
  showMoreText: {
    color: colors.primary,
  },
  emptyContainer: {
    padding: spacing.large,
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginVertical: spacing.medium,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.small,
  },
});

export default CommentSection;