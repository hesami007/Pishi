import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { CAT_EMOJI } from '../../App';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import VideoDetailScreen from '../screens/Video/VideoDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Temporary placeholder components for screens we haven't created yet
const PlaceholderScreen = ({ route }) => {
  const { theme } = useTheme();
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
    }}>
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold',
        color: theme === 'dark' ? '#FFFFFF' : '#212121'
      }}>
        {route.name} Screen {CAT_EMOJI}
      </Text>
      <Text style={{ 
        marginTop: 10,
        color: theme === 'dark' ? '#A0A0A0' : '#757575'
      }}>
        Coming soon...
      </Text>
    </View>
  );
};

// Temporary components until we create the actual screens
const ExploreScreen = (props) => <PlaceholderScreen {...props} name="Explore" />;
const LibraryScreen = (props) => <PlaceholderScreen {...props} name="Library" />;
const ProfileScreen = (props) => <PlaceholderScreen {...props} name="Profile" />;
const NotificationsScreen = (props) => <PlaceholderScreen {...props} name="Notifications" />;
const VideoPlayerScreen = (props) => <PlaceholderScreen {...props} name="VideoPlayer" />;
const PlaylistDetailScreen = (props) => <PlaceholderScreen {...props} name="PlaylistDetail" />;
const UserProfileScreen = (props) => <PlaceholderScreen {...props} name="UserProfile" />;
const CommentManagementScreen = (props) => <PlaceholderScreen {...props} name="CommentManagement" />;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home stack navigator
const HomeStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme === 'dark' ? '#FFFFFF' : '#212121',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ title: `CatFlix ${CAT_EMOJI}` }}
      />
      <Stack.Screen 
        name="VideoDetail" 
        component={VideoDetailScreen}
        options={{ title: 'Video Details' }}
      />
      <Stack.Screen 
        name="VideoPlayer" 
        component={VideoPlayerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen 
        name="PlaylistDetail" 
        component={PlaylistDetailScreen}
        options={{ title: 'Playlist' }}
      />
    </Stack.Navigator>
  );
};

// Search stack navigator
const SearchStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme === 'dark' ? '#FFFFFF' : '#212121',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ title: `Search ${CAT_EMOJI}` }}
      />
      <Stack.Screen 
        name="VideoDetail" 
        component={VideoDetailScreen}
        options={{ title: 'Video Details' }}
      />
      <Stack.Screen 
        name="VideoPlayer" 
        component={VideoPlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Library stack navigator
const LibraryStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme === 'dark' ? '#FFFFFF' : '#212121',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="LibraryMain" 
        component={LibraryScreen} 
        options={{ title: `Library ${CAT_EMOJI}` }}
      />
      <Stack.Screen 
        name="PlaylistDetail" 
        component={PlaylistDetailScreen}
        options={{ title: 'Playlist' }}
      />
      <Stack.Screen 
        name="VideoDetail" 
        component={VideoDetailScreen}
        options={{ title: 'Video Details' }}
      />
    </Stack.Navigator>
  );
};

// Profile stack navigator
const ProfileStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme === 'dark' ? '#FFFFFF' : '#212121',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ title: `Profile ${CAT_EMOJI}` }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="CommentManagement" 
        component={CommentManagementScreen}
        options={{ title: 'Your Comments' }}
      />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};

// Notifications stack navigator
const NotificationsStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme === 'dark' ? '#FFFFFF' : '#212121',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="NotificationsMain" 
        component={NotificationsScreen} 
        options={{ title: `Notifications ${CAT_EMOJI}` }}
      />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};

// Tab bar icons
const TabBarIcon = ({ routeName, focused, color }) => {
  let icon = '';
  
  switch (routeName) {
    case 'Home':
      icon = '🏠';
      break;
    case 'Search':
      icon = '🔍';
      break;
    case 'Library':
      icon = '📚';
      break;
    case 'Notifications':
      icon = '🔔';
      break;
    case 'Profile':
      icon = '😺';
      break;
    default:
      icon = '🐱';
  }
  
  return (
    <Text style={{ fontSize: 24 }}>{icon}</Text>
  );
};

// Main tab navigator
const MainNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <TabBarIcon routeName={route.name} focused={focused} color={color} />;
        },
        tabBarActiveTintColor: theme === 'dark' ? '#1E88E5' : '#1976D2',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0A0A0' : '#757575',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          borderTopColor: theme === 'dark' ? '#333333' : '#DDDDDD',
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;