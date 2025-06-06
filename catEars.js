import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../../theme/colors';

/**
 * SVG cat ears for the CatFlix app
 */
export const CatEars = ({ width = 24, height = 24, color = colors.primary }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <G>
        {/* Left Ear */}
        <Path
          d="M5 4 L1 10 L7 12 L5 4"
          fill={color}
        />
        
        {/* Right Ear */}
        <Path
          d="M19 4 L23 10 L17 12 L19 4"
          fill={color}
        />
        
        {/* Inner Ear Details */}
        <Path
          d="M5 6 L3 9 L6 10 L5 6"
          fill="#FFC0CB"
          fillOpacity="0.7"
        />
        <Path
          d="M19 6 L21 9 L18 10 L19 6"
          fill="#FFC0CB"
          fillOpacity="0.7"
        />
      </G>
    </Svg>
  );
};

export default CatEars;
