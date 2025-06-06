import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

/**
 * SVG cat whiskers for the CatFlix app
 */
export const CatWhiskers = ({ width = 24, height = 24, color = colors.text }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      {/* Left Whiskers */}
      <Path
        d="M8 10 L1 9"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <Path
        d="M8 12 L2 12"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <Path
        d="M8 14 L1 15"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      
      {/* Right Whiskers */}
      <Path
        d="M16 10 L23 9"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <Path
        d="M16 12 L22 12"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <Path
        d="M16 14 L23 15"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CatWhiskers;
