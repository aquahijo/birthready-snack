import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { PregnancyNumber } from '../../types';
import { colors, typography } from '../../constants/colors';
import { layout } from '../../constants/layout';
import { strings } from '../../constants/strings';
import { useUserStore } from '../../store/userStore';
import Button from '../../components/Button';
import OptionCard from '../../components/OptionCard';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingPregnancyNumber'>;

const options: { value: PregnancyNumber; label: string }[] = [
  { value: 1, label: strings.onboarding.pregnancyNumber.first },
  { value: 2, label: strings.onboarding.pregnancyNumber.second },
  { value: 3, label: strings.onboarding.pregnancyNumber.thirdPlus },
];

const OnboardingPregnancyNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = React.useState<PregnancyNumber | null>(null);
  const { setPregnancyNumber } = useUserStore();

  const handleNext = () => {
    if (selectedOption) {
      setPregnancyNumber(selectedOption);
      navigation.navigate('OnboardingNotifications');
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
          <Text style={styles.step}>Step 2 of 3</Text>
          <Text style={styles.title}>{strings.onboarding.pregnancyNumber.title}</Text>
          <Text style={styles.subtitle}>{strings.onboarding.pregnancyNumber.subtitle}</Text>
        </View>

        <View style={styles.options}>
          {options.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={selectedOption === option.value}
              onPress={() => setSelectedOption(option.value)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={handleNext}
          disabled={!selectedOption}
          style={styles.nextButton}
        >
          {strings.common.next}
        </Button>
        <Button variant="ghost" onPress={handleBack}>
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
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 40,
    gap: layout.spacing.sm,
  },
  nextButton: {
    width: '100%',
  },
});

export default OnboardingPregnancyNumberScreen;
