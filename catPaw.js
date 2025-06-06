import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';

/**
 * SVG cat paw for the CatFlix app
 */
export const CatPaw = ({ width = 24, height = 24, color = colors.primary }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      {/* Main paw pad */}
      <Circle
        cx="12"
        cy="14"
        r="5"
        fill={color}
      />
      
      {/* Toe beans */}
      <Circle
        cx="8"
        cy="8"
        r="3"
        fill={color}
      />
      <Circle
        cx="16"
        cy="8"
        r="3"
        fill={color}
      />
      <Circle
        cx="5"
        cy="12"
        r="3"
        fill={color}
      />
      <Circle
        cx="19"
        cy="12"
        r="3"
        fill={color}
      />
      
      {/* Paw print inner details */}
      <Circle
        cx="8"
        cy="8"
        r="1"
        fill={colors.backgroundSecondary}
        fillOpacity="0.3"
      />
      <Circle
        cx="16"
        cy="8"
        r="1"
        fill={colors.backgroundSecondary}
        fillOpacity="0.3"
      />
      <Circle
        cx="5"
        cy="12"
        r="1"
        fill={colors.backgroundSecondary}
        fillOpacity="0.3"
      />
      <Circle
        cx="19"
        cy="12"
        r="1"
        fill={colors.backgroundSecondary}
        fillOpacity="0.3"
      />
      <Path
        d="M10 14 L14 14 L12 16 Z"
        fill={colors.backgroundSecondary}
        fillOpacity="0.3"
      />
    </Svg>
  );
};

export default CatPaw;
