import { StyleSheet, Text, View, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { colors, typography } from '../../constants/colors';
import { layout } from '../../constants/layout';
import { strings } from '../../constants/strings';
import { useUserStore } from '../../store/userStore';
import Button from '../../components/Button';
import AppleSignInButton from '../../components/AppleSignInButton';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import MagicLinkForm from '../../components/MagicLinkForm';
import EmailPasswordForm from '../../components/EmailPasswordForm';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      setUser({
        id: 'demo-user-id',
        email,
        dueDate: null,
        currentWeek: null,
        pregnancyNumber: 1,
        subscriptionTier: 'free',
        hasCompletedOnboarding: false,
        partnerCode: null,
        linkedPartnerId: null,
        createdAt: new Date().toISOString(),
      });
      navigation.replace('OnboardingDueDate');
    } catch {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      setUser({
        id: 'demo-user-id',
        email,
        dueDate: null,
        currentWeek: null,
        pregnancyNumber: 1,
        subscriptionTier: 'free',
        hasCompletedOnboarding: false,
        partnerCode: null,
        linkedPartnerId: null,
        createdAt: new Date().toISOString(),
      });
      navigation.replace('OnboardingDueDate');
    } catch {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setUser({
      id: 'demo-user-id',
      email: 'apple@example.com',
      dueDate: null,
      currentWeek: null,
      pregnancyNumber: 1,
      subscriptionTier: 'free',
      hasCompletedOnboarding: false,
      partnerCode: null,
      linkedPartnerId: null,
      createdAt: new Date().toISOString(),
    });
    navigation.replace('OnboardingDueDate');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setUser({
      id: 'demo-user-id',
      email: 'google@example.com',
      dueDate: null,
      currentWeek: null,
      pregnancyNumber: 1,
      subscriptionTier: 'free',
      hasCompletedOnboarding: false,
      partnerCode: null,
      linkedPartnerId: null,
      createdAt: new Date().toISOString(),
    });
    navigation.replace('OnboardingDueDate');
  };

  if (showMagicLink) {
    return (
      <MagicLinkForm
        onSubmit={handleMagicLink}
        onBack={() => setShowMagicLink(false)}
        isLoading={isLoading}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>{strings.app.name}</Text>
        <Text style={styles.tagline}>{strings.app.tagline}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {mode === 'signin' ? strings.auth.signIn : strings.auth.signUp}
        </Text>

        {Platform.OS === 'ios' && (
          <AppleSignInButton onPress={handleAppleSignIn} />
        )}

        <GoogleSignInButton onPress={handleGoogleSignIn} />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <EmailPasswordForm
          mode={mode}
          onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}
          isLoading={isLoading}
        />

        <Button
          variant="ghost"
          onPress={() => setShowMagicLink(true)}
          style={styles.magicLinkButton}
        >
          {strings.auth.orContinueWithMagicLink}
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {mode === 'signin' ? strings.auth.noAccount : strings.auth.hasAccount}
          </Text>
          <Button
            variant="ghost"
            onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          >
            {mode === 'signin' ? strings.auth.signUpLink : strings.auth.signInLink}
          </Button>
        </View>
      </View>
    </View>
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
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: layout.spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: layout.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: layout.spacing.md,
    color: colors.textTertiary,
    fontSize: typography.sizes.sm,
  },
  magicLinkButton: {
    marginTop: layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.spacing.xl,
    paddingBottom: layout.spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
});

export default SignInScreen;
