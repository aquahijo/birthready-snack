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

interface EmailPasswordFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder={strings.auth.email}
          placeholderTextColor={colors.textTertiary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder={strings.auth.password}
          placeholderTextColor={colors.textTertiary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      {mode === 'signup' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.confirm && styles.inputError]}
            placeholder={strings.auth.confirmPassword}
            placeholderTextColor={colors.textTertiary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
        </View>
      )}

      <Button
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.submitButton}
      >
        {mode === 'signin' ? strings.auth.signIn : strings.auth.signUp}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    marginTop: layout.spacing.sm,
    width: '100%',
  },
});

export default EmailPasswordForm;
