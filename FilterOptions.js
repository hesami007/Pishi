import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const GENRE_OPTIONS = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 
  'Sci-Fi', 'Documentary', 'Animation', 'Thriller'
];

const YEAR_OPTIONS = [
  '2023', '2022', '2021', '2020', '2019', '2010-2018', '2000-2009', 'Before 2000'
];

const QUALITY_OPTIONS = [
  '4K', 'HD', 'SD'
];

const FilterOptions = ({ selectedFilters, onApplyFilters, onClearFilters }) => {
  const [filters, setFilters] = useState({
    genre: selectedFilters.genre,
    year: selectedFilters.year,
    quality: selectedFilters.quality
  });

  const handleSelect = (type, value) => {
    // Toggle selection
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      genre: null,
      year: null,
      quality: null
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const renderFilterOption = (type, options, selectedValue) => {
    return (
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.optionsContainer}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedValue === option && styles.selectedOption
              ]}
              onPress={() => handleSelect(type, option)}
            >
              <Text 
                style={[
                  styles.optionText,
                  selectedValue === option && styles.selectedOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderFilterOption('genre', GENRE_OPTIONS, filters.genre)}
      {renderFilterOption('year', YEAR_OPTIONS, filters.year)}
      {renderFilterOption('quality', QUALITY_OPTIONS, filters.quality)}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: spacing.medium,
    margin: spacing.medium,
    marginTop: 0,
  },
  filterSection: {
    marginBottom: spacing.medium,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  optionsContainer: {
    paddingBottom: spacing.small,
  },
  optionButton: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
    marginRight: spacing.small,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 90, 95, 0.2)',
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
  },
  clearButton: {
    padding: spacing.medium,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.backgroundTertiary,
    flex: 1,
    marginRight: spacing.small,
    alignItems: 'center',
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
});

export default FilterOptions;