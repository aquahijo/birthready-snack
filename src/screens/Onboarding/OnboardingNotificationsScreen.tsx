import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { colors, typography } from '../../constants/colors';
import { layout } from '../../constants/layout';
import { strings } from '../../constants/strings';
import { useUserStore } from '../../store/userStore';
import Button from '../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingNotifications'>;

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const OnboardingNotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const [options, setOptions] = useState<NotificationOption[]>([
    {
      id: 'weekly',
      label: strings.onboarding.notifications.weeklyReminder,
      description: 'Get a reminder when a new module is available',
      enabled: true,
    },
    {
      id: 'labor',
      label: strings.onboarding.notifications.laborApproaching,
      description: 'Reminder when you reach week 37',
      enabled: true,
    },
    {
      id: 'mental',
      label: strings.onboarding.notifications.mentalHealth,
      description: 'Check-in prompts at key milestones',
      enabled: true,
    },
  ]);
  const { completeOnboarding } = useUserStore();

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const handleEnable = async () => {
    const { status } = await requestNotificationsPermission();
    if (status === 'granted') {
      completeOnboarding();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  const handleLater = () => {
    completeOnboarding();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const requestNotificationsPermission = async () => {
    return { status: 'granted' };
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.step}>Step 3 of 3</Text>
          <Text style={styles.title}>{strings.onboarding.notifications.title}</Text>
          <Text style={styles.subtitle}>{strings.onboarding.notifications.subtitle}</Text>
        </View>

        <View style={styles.options}>
          {options.map((option) => (
            <View key={option.id} style={styles.optionRow}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Switch
                value={option.enabled}
                onValueChange={() => toggleOption(option.id)}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={option.enabled ? colors.primary : colors.background}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleEnable} style={styles.enableButton}>
          {strings.onboarding.notifications.enable}
        </Button>
        <Button variant="ghost" onPress={handleLater}>
          {strings.onboarding.notifications.later}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding,
  },
  header: {
    paddingTop: 60,
    marginBottom: layout.spacing.xl,
  },
  step: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.sm,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  options: {
    gap: layout.spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSecondary,
    padding: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: layout.spacing.md,
  },
  optionLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  optionDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 40,
    gap: layout.spacing.sm,
  },
  enableButton: {
    width: '100%',
  },
});

export default OnboardingNotificationsScreen;
