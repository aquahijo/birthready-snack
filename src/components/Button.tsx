import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography } from '../constants/colors';
import { layout } from '../constants/layout';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        // eslint-disable-next-line react-native/no-unused-styles
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.textInverse : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            // eslint-disable-next-line react-native/no-unused-styles
            styles[`${variant}Text` as keyof typeof styles] as TextStyle,
            isDisabled && styles.disabledText,
            textStyle,
          ]}
        >
          {children || title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  base: {
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  primary: {
    backgroundColor: colors.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondary: {
    backgroundColor: colors.secondary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  primaryText: {
    color: colors.textInverse,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondaryText: {
    color: colors.textInverse,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outlineText: {
    color: colors.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  ghostText: {
    color: colors.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
