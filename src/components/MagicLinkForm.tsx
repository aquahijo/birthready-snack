import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography } from '../constants/colors';
import { layout } from '../constants/layout';
import { strings } from '../constants/strings';
import Button from './Button';

interface MagicLinkFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSent(true);
      onSubmit(email);
    }
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>{strings.app.name}</Text>
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>{strings.auth.magicLinkSent}</Text>
          <Text style={styles.successSubtitle}>
            Click the link in your email to sign in
          </Text>
        </View>
        <View style={styles.footer}>
          <Button variant="ghost" onPress={onBack}>
            {strings.common.back}
          </Button>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>{strings.app.name}</Text>
        <Text style={styles.tagline}>{strings.app.tagline}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{strings.auth.orContinueWithMagicLink}</Text>
        <Text style={styles.subtitle}>
          We'll send you a link to sign in without a password
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={strings.auth.email}
            placeholderTextColor={colors.textTertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <Button
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
        >
          {strings.auth.sendMagicLink}
        </Button>
      </View>

      <View style={styles.footer}>
        <Button variant="ghost" onPress={onBack}>
          {strings.common.back}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: layout.screenPadding,
    alignItems: 'center',
  },
  logo: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  tagline: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    marginTop: layout.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.spacing['2xl'],
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: layout.spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: layout.spacing.xl,
  },
  inputContainer: {
    marginBottom: layout.spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    fontSize: typography.sizes.base,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    marginTop: layout.spacing.xs,
  },
  submitButton: {
    width: '100%',
  },
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 40,
  },
  successContainer: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    fontSize: 64,
    color: colors.success,
    marginBottom: layout.spacing.lg,
  },
  successTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: layout.spacing.sm,
  },
  successSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default MagicLinkForm;
