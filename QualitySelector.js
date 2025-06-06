import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CAT_EMOJI } from '../../../App';

const QualitySelector = ({ 
  qualities, 
  selectedQuality, 
  onQualityChange,
  showDownloadOptions = false
}) => {
  const { theme } = useTheme();
  
  if (!qualities || qualities.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ 
          color: theme === 'dark' ? '#A0A0A0' : '#757575',
          textAlign: 'center',
          padding: 20 
        }}>
          No quality options available
        </Text>
      </View>
    );
  }
  
  // Handle quality selection
  const handleSelectQuality = (quality) => {
    if (onQualityChange) {
      onQualityChange(quality);
    }
  };
  
  // Handle download request
  const handleDownload = (quality) => {
    console.log(`Download requested for ${quality} quality`);
    // In real app, this would trigger the download service
  };
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.label,
        { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
      ]}>
        Select Quality:
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.qualitiesContainer}
      >
        {qualities.map((quality) => (
          <TouchableOpacity
            key={`quality-${quality}`}
            style={[
              styles.qualityButton,
              selectedQuality === quality && styles.selectedQualityButton,
              { 
                backgroundColor: theme === 'dark' 
                  ? (selectedQuality === quality ? '#1E88E5' : '#2C2C2C') 
                  : (selectedQuality === quality ? '#1976D2' : '#F5F5F5'),
                borderColor: theme === 'dark' ? '#333333' : '#DDDDDD'
              }
            ]}
            onPress={() => handleSelectQuality(quality)}
          >
            <Text style={[
              styles.qualityText,
              { 
                color: selectedQuality === quality 
                  ? '#FFFFFF' 
                  : (theme === 'dark' ? '#A0A0A0' : '#757575')
              }
            ]}>
              {quality}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {showDownloadOptions && (
        <View style={styles.downloadContainer}>
          <Text style={[
            styles.label,
            { color: theme === 'dark' ? '#A0A0A0' : '#757575' }
          ]}>
            Download Options:
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.qualitiesContainer}
          >
            {qualities.map((quality) => (
              <TouchableOpacity
                key={`download-${quality}`}
                style={[
                  styles.downloadButton,
                  { 
                    backgroundColor: 'transparent',
                    borderColor: theme === 'dark' ? '#1E88E5' : '#1976D2'
                  }
                ]}
                onPress={() => handleDownload(quality)}
              >
                <Text style={[
                  styles.downloadText,
                  { color: theme === 'dark' ? '#1E88E5' : '#1976D2' }
                ]}>
                  {quality} 📥
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  qualitiesContainer: {
    paddingBottom: 8,
  },
  qualityButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
  },
  selectedQualityButton: {
    borderWidth: 0,
  },
  qualityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  downloadContainer: {
    marginTop: 16,
  },
  downloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '500',
  }
});

export default QualitySelector;