// AppleSignInButton.tsx
// Snack-compatible: uses pure React Native, no expo-apple-authentication
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { colors, typography } from '../constants/colors';
import { layout } from '../constants/layout';

interface AppleSignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const AppleSignInButton: React.FC<AppleSignInButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  // Only show on iOS
  if (Platform.OS !== 'ios') return null;

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}></Text>
      <Text style={styles.text}>Continue with Apple</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    minHeight: 48,
    marginBottom: layout.spacing.md,
  },
  disabled: { opacity: 0.5 },
  icon: {
    fontSize: 20,
    color: colors.textInverse,
    marginRight: layout.spacing.sm,
  },
  text: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.textInverse,
  },
});

export default AppleSignInButton;
