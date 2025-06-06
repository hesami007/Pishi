import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  Animated 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.medium * 2;
const DOT_SIZE = 8;
const DOT_SPACING = 8;

const FeaturedCarousel = ({ videos, onVideoPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll the carousel every 5 seconds
    const startAutoScroll = () => {
      timerRef.current = setInterval(() => {
        if (scrollViewRef.current && videos.length > 0) {
          const nextIndex = (activeIndex + 1) % videos.length;
          scrollViewRef.current.scrollTo({
            x: nextIndex * CARD_WIDTH,
            animated: true
          });
          setActiveIndex(nextIndex);
        }
      }, 5000);
    };

    // Start auto-scroll
    startAutoScroll();

    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, videos.length]);

  // Handle scroll event to update active index
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / CARD_WIDTH);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  );

  // Reset timer when user manually scrolls
  const handleScrollBeginDrag = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleScrollEndDrag = () => {
    // Restart timer after user stops dragging
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      if (scrollViewRef.current && videos.length > 0) {
        const nextIndex = (activeIndex + 1) % videos.length;
        scrollViewRef.current.scrollTo({
          x: nextIndex * CARD_WIDTH,
          animated: true
        });
        setActiveIndex(nextIndex);
      }
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onVideoPress(video)}
          >
            <Image 
              source={{ uri: video.thumbnail }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardOverlay}>
              <View style={styles.cardContent}>
                {video.featured && (
                  <View style={styles.featuredBadge}>
                    <Icon name="star" size={12} color={colors.text} />
                    <Text style={styles.featuredText}>Featured</Text>
                  </View>
                )}
                <Text style={styles.cardTitle}>{video.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>
                    {video.year} • {video.duration} • {video.rating}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => onVideoPress(video)}
                >
                  <Icon name="play" size={16} color={colors.text} />
                  <Text style={styles.playButtonText}>Play</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Pagination dots */}
      {videos.length > 1 && (
        <View style={styles.pagination}>
          {videos.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  opacity: scrollX.interpolate({
                    inputRange: [
                      (index - 1) * CARD_WIDTH,
                      index * CARD_WIDTH,
                      (index + 1) * CARD_WIDTH
                    ],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                  }),
                  // Make active dot larger
                  transform: [
                    {
                      scale: scrollX.interpolate({
                        inputRange: [
                          (index - 1) * CARD_WIDTH,
                          index * CARD_WIDTH,
                          (index + 1) * CARD_WIDTH
                        ],
                        outputRange: [1, 1.2, 1],
                        extrapolate: 'clamp'
                      })
                    }
                  ],
                  backgroundColor: scrollX.interpolate({
                    inputRange: [
                      (index - 1) * CARD_WIDTH,
                      index * CARD_WIDTH,
                      (index + 1) * CARD_WIDTH
                    ],
                    outputRange: [colors.inactive, colors.primary, colors.inactive],
                    extrapolate: 'clamp'
                  })
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  scrollContent: {
    paddingHorizontal: spacing.medium,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: spacing.medium,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: spacing.medium,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
    borderRadius: 4,
    marginBottom: spacing.small,
  },
  featuredText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  cardMetaText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: colors.text,
    marginLeft: spacing.small,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  paginationDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginHorizontal: DOT_SPACING / 2,
  },
});

export default FeaturedCarousel;
