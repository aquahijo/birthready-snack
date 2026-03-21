import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface ProgressRingProps {
  progress: number;
  size: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: colors.border,
          },
        ]}
      />
      <View
        style={[
          styles.progress,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: colors.primary,
            borderTopColor: 'transparent',
            borderRightColor: progress > 0.25 ? colors.primary : 'transparent',
            borderBottomColor: progress > 0.5 ? colors.primary : 'transparent',
            borderLeftColor: progress > 0.75 ? colors.primary : 'transparent',
            transform: [{ rotate: '-90deg' }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  progress: {
    position: 'absolute',
  },
});

export default ProgressRing;
