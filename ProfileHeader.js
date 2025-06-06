import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CatAvatar } from '../UI/CatAvatar';
import { CatButton } from '../UI/CatButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const ProfileHeader = ({ profile, onEditProfile, isOwnProfile = true }) => {
  if (!profile) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <CatAvatar 
          uri={profile.avatar} 
          size={80} 
          name={profile.username}
          showBorder={true}
        />
        
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{profile.username}</Text>
          
          {profile.email && (
            <View style={styles.emailContainer}>
              <Icon name="mail" size={14} color={colors.textSecondary} />
              <Text style={styles.email}>{profile.email}</Text>
            </View>
          )}
          
          {isOwnProfile ? (
            <CatButton
              title="Edit Profile"
              onPress={onEditProfile}
              style={styles.editButton}
              textStyle={styles.editButtonText}
              size="small"
              variant="outlined"
              icon="edit-2"
            />
          ) : (
            <View style={styles.actionButtons}>
              <CatButton
                title="Follow"
                style={styles.followButton}
                textStyle={styles.followButtonText}
                size="small"
              />
              <TouchableOpacity style={styles.messageButton}>
                <Icon name="message-circle" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      
      {profile.bio && (
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    margin: spacing.medium,
  },
  headerTop: {
    flexDirection: 'row',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.medium,
    justifyContent: 'center',
  },
  username: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  email: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: spacing.small,
  },
  editButton: {
    paddingHorizontal: spacing.medium,
    height: 30,
  },
  editButtonText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    paddingHorizontal: spacing.medium,
    height: 30,
    marginRight: spacing.small,
  },
  followButtonText: {
    fontSize: 12,
  },
  messageButton: {
    backgroundColor: colors.backgroundTertiary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.backgroundTertiary,
    marginTop: spacing.medium,
    paddingTop: spacing.medium,
  },
  bio: {
    color: colors.text,
    lineHeight: 20,
  },
});

export default ProfileHeader;
