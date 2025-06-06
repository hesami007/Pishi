import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

const ActorsList = ({ actors, onActorPress }) => {
  const { theme } = useTheme();
  
  if (!actors || actors.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.sectionTitle,
          { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
        ]}>
          Actors {CAT_EMOJI}
        </Text>
        <Text style={{ 
          color: theme === 'dark' ? '#A0A0A0' : '#757575',
          textAlign: 'center',
          padding: 20 
        }}>
          No actor information available
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.sectionTitle,
        { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
      ]}>
        Actors {CAT_EMOJI}
      </Text>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actorsContainer}
      >
        {actors.map(actor => (
          <TouchableOpacity
            key={`actor-${actor.id}`}
            style={styles.actorItem}
            onPress={() => onActorPress && onActorPress(actor)}
            activeOpacity={0.8}
          >
            <Image 
              source={{ uri: actor.photo }}
              style={styles.actorPhoto}
            />
            
            <Text style={[
              styles.actorName,
              { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
            ]}
              numberOfLines={1}
            >
              {actor.name}
            </Text>
            
            <Text style={[
              styles.actorRole,
              { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
            ]}
              numberOfLines={1}
            >
              {actor.role}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actorsContainer: {
    paddingBottom: 8,
  },
  actorItem: {
    marginRight: 16,
    width: 100,
    alignItems: 'center',
  },
  actorPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  actorName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
    width: 100,
  },
  actorRole: {
    fontSize: 12,
    textAlign: 'center',
    width: 100,
  }
});

export default ActorsList;