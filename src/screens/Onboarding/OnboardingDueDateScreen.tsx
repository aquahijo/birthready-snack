import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { colors, typography } from '../../constants/colors';
import { layout } from '../../constants/layout';
import { strings } from '../../constants/strings';
import Button from '../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingDueDate'>;

const OnboardingDueDateScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleNext = () => {
    navigation.navigate('OnboardingPregnancyNumber');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPregnancyNumber');
  };

  const generateDateOptions = () => {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 280; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + (60 + i));
      dates.push(date);
    }
    
    return dates;
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
          <Text style={styles.step}>Step 1 of 3</Text>
          <Text style={styles.title}>{strings.onboarding.dueDate.title}</Text>
          <Text style={styles.subtitle}>{strings.onboarding.dueDate.subtitle}</Text>
        </View>

        <View style={styles.content}>
          {showDatePicker ? (
            <View style={styles.datePickerContainer}>
              {generateDateOptions()
                .filter((_, i) => i % 7 === 0)
                .slice(0, 20)
                .map((date) => (
                  <TouchableOpacity
                    key={date.toISOString()}
                    style={[
                      styles.dateOption,
                      selectedDate?.toDateString() === date.toDateString() && 
                        styles.dateOptionSelected,
                    ]}
                    onPress={() => {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dateOptionText,
                        selectedDate?.toDateString() === date.toDateString() && 
                          styles.dateOptionTextSelected,
                      ]}
                    >
                      {formatDate(date)}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ) : (
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[
                styles.dateInputText,
                !selectedDate && styles.dateInputPlaceholder,
              ]}>
                {selectedDate ? formatDate(selectedDate) : strings.onboarding.dueDate.placeholder}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={handleNext}
          disabled={!selectedDate}
          style={styles.nextButton}
        >
          {strings.common.next}
        </Button>
        <Button variant="ghost" onPress={handleSkip}>
          {strings.onboarding.dueDate.skip}
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
  content: {
    flex: 1,
  },
  dateInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dateInputText: {
    fontSize: typography.sizes.lg,
    color: colors.text,
  },
  dateInputPlaceholder: {
    color: colors.textTertiary,
  },
  datePickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
  },
  dateOption: {
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateOptionText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
  },
  dateOptionTextSelected: {
    color: colors.textInverse,
    fontWeight: typography.weights.medium,
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

export default OnboardingDueDateScreen;
