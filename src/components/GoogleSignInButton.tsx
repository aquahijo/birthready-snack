// GoogleSignInButton.tsx
// Snack-compatible: uses pure React Native, no @react-native-google-signin
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/colors';
import { layout } from '../constants/layout';

interface GoogleSignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>G</Text>
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    marginBottom: layout.spacing.md,
  },
  disabled: { opacity: 0.5 },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.danger,
    marginRight: layout.spacing.sm,
  },
  text: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
});

export default GoogleSignInButton;
