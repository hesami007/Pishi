import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import FollowersScreen from '../screens/Profile/FollowersScreen';
import FollowingScreen from '../screens/Profile/FollowingScreen';
import PlaylistsScreen from '../screens/Playlist/PlaylistsScreen';
import PlaylistDetailScreen from '../screens/Playlist/PlaylistDetailScreen';
import VideoDetailScreen from '../screens/Video/VideoDetailScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ title: 'My Profile' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="Followers" 
        component={FollowersScreen} 
        options={{ title: 'Followers' }}
      />
      <Stack.Screen 
        name="Following" 
        component={FollowingScreen} 
        options={{ title: 'Following' }}
      />
      <Stack.Screen 
        name="UserPlaylists" 
        component={PlaylistsScreen} 
        options={{ title: 'My Playlists' }}
      />
      <Stack.Screen 
        name="PlaylistDetail" 
        component={PlaylistDetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.title || 'Playlist' 
        })}
      />
      <Stack.Screen 
        name="VideoDetail" 
        component={VideoDetailScreen} 
        options={{ 
          title: '',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
