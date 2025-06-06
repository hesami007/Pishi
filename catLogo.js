import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { colors } from '../../theme/colors';

/**
 * SVG logo for the CatFlix app
 */
export const CatLogo = ({ width = 120, height = 40, color = colors.primary }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 40">
      {/* Cat Ears */}
      <G>
        <Path
          d="M15 5 L5 15 L15 20 L15 5"
          fill={color}
        />
        <Path
          d="M35 5 L45 15 L35 20 L35 5"
          fill={color}
        />
      </G>
      
      {/* Cat Head */}
      <Circle
        cx="25"
        cy="22"
        r="15"
        fill={color}
      />
      
      {/* Cat Eyes */}
      <Circle
        cx="18"
        cy="18"
        r="2.5"
        fill="#121212"
      />
      <Circle
        cx="32"
        cy="18"
        r="2.5"
        fill="#121212"
      />
      
      {/* Cat Nose */}
      <Path
        d="M25 22 L23 26 L27 26 Z"
        fill="#121212"
      />
      
      {/* Cat Whiskers */}
      <Path
        d="M18 24 L8 22 M18 26 L10 28 M32 24 L42 22 M32 26 L40 28"
        stroke="#FFF"
        strokeWidth="1"
        strokeLinecap="round"
      />
      
      {/* Text "CatFlix" */}
      <Path
        d="M55 15 L60 15 L60 30 L55 30 L55 15 Z"
        fill="#FFF"
      />
      <Path
        d="M62 15 L67 15 L67 20 L72 15 L78 15 L71 22 L78 30 L72 30 L67 24 L67 30 L62 30 L62 15 Z"
        fill="#FFF"
      />
      <Path
        d="M80 15 L85 15 L85 25 L90 25 L90 30 L80 30 L80 15 Z"
        fill="#FFF"
      />
      <Path
        d="M95 15 L100 15 L100 30 L95 30 L95 15 Z"
        fill="#FFF"
      />
      <Path
        d="M102 15 L107 15 L107 20 L112 15 L115 15 L110 20 L115 30 L109 30 L107 24 L107 30 L102 30 L102 15 Z"
        fill="#FFF"
      />
    </Svg>
  );
};

export default CatLogo;
