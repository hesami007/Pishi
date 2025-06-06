import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

/**
 * SVG cat tail for the CatFlix app
 */
export const CatTail = ({ width = 24, height = 24, color = colors.primary }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      {/* Curled Tail */}
      <Path
        d="M12 20 C16 20, 20 16, 20 12 C20 8, 16 8, 16 12 C16 14, 14 16, 12 16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};

export default CatTail;
