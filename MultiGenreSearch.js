import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

const MultiGenreSearch = ({ onGenreChange, initialSelectedGenres = [] }) => {
  const { theme } = useTheme();
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  
  // List of available genres (can be fetched from API in real app)
  const availableGenres = [
    'comedy', 'drama', 'action', 'thriller', 'romance', 
    'horror', 'sci-fi', 'fantasy', 'documentary', 'animation',
    'family', 'historical', 'crime', 'adventure', 'musical'
  ];
  
  // Update the parent component when selections change
  useEffect(() => {
    if (onGenreChange) {
      onGenreChange(selectedGenres);
    }
  }, [selectedGenres]);
  
  // Toggle the selection of a genre
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  // Clear all selected genres
  const clearAll = () => {
    setSelectedGenres([]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: theme === 'dark' ? '#FFFFFF' : '#212121' }
        ]}>
          Select Genres {CAT_EMOJI}
        </Text>
        
        {selectedGenres.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={{ 
              color: theme === 'dark' ? '#1E88E5' : '#1976D2',
              fontSize: 14
            }}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[
        styles.subtitle,
        { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
      ]}>
        Select multiple genres to find videos matching ALL selected genres
      </Text>
      
      <ScrollView 
        contentContainerStyle={styles.genresContainer}
        horizontal={false}
      >
        <View style={styles.genresGrid}>
          {availableGenres.map(genre => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreButton,
                { 
                  backgroundColor: selectedGenres.includes(genre) 
                    ? (theme === 'dark' ? '#1E88E5' : '#1976D2')
                    : (theme === 'dark' ? '#2C2C2C' : '#F5F5F5'),
                  borderColor: theme === 'dark' ? '#333333' : '#DDDDDD'
                }
              ]}
              onPress={() => toggleGenre(genre)}
            >
              <Text style={[
                styles.genreText,
                { 
                  color: selectedGenres.includes(genre) 
                    ? '#FFFFFF' 
                    : (theme === 'dark' ? '#A0A0A0' : '#757575')
                }
              ]}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Text>
              
              {selectedGenres.includes(genre) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {selectedGenres.length > 0 && (
        <View style={[
          styles.selectedInfo,
          { 
            backgroundColor: theme === 'dark' ? '#2C2C2C' : '#F5F5F5',
            borderColor: theme === 'dark' ? '#333333' : '#DDDDDD'
          }
        ]}>
          <Text style={{ 
            color: theme === 'dark' ? '#FFFFFF' : '#212121',
            fontWeight: '500'
          }}>
            Selected: {selectedGenres.length}
          </Text>
          <Text style={{ color: theme === 'dark' ? '#A0A0A0' : '#757575' }}>
            {selectedGenres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 12,
  },
  genresContainer: {
    flexGrow: 1,
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  genreText: {
    fontSize: 14,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 4,
  },
  selectedInfo: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  }
});

export default MultiGenreSearch;