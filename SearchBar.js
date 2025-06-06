import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const SearchBar = ({ value, onChangeText, onSubmitEditing, placeholder = 'Search for movies, shows, etc.' }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Icon name="x" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    height: 44,
  },
  icon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default SearchBar;