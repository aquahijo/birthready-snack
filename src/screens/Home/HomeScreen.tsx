import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { colors, typography } from '../../constants/colors';
import { layout } from '../../constants/layout';
import { strings } from '../../constants/strings';
import { useUserStore } from '../../store/userStore';
import Card from '../../components/Card';
import ProgressRing from '../../components/ProgressRing';
import Button from '../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useUserStore();
  const currentWeek = user?.currentWeek || 1;

  const shouldShowCheckIn = currentWeek === 20 || currentWeek === 36;
  const shouldShowTimer = currentWeek >= 37;

  const getThisWeekModule = () => {
    if (currentWeek < 13) {
      return { title: 'Getting Started', subtitle: 'Your pregnancy journey begins' };
    } else if (currentWeek < 27) {
      return { title: 'Understanding Early Labor', subtitle: 'Learn the signs and what to do' };
    } else if (currentWeek < 36) {
      return { title: 'Preparing for Active Labor', subtitle: 'Building your birth skills' };
    } else {
      return { title: 'Final Preparations', subtitle: "You're ready for birth day" };
    }
  };

  const thisWeekModule = getThisWeekModule();

  const handleModulePress = () => {
    navigation.navigate('ModulePlayer', { moduleId: 'early-labor-1' });
  };

  const handleCheckInPress = () => {
    navigation.navigate('MentalHealthCheckIn');
  };

  const handleTimerPress = () => {
    navigation.navigate('ContractionTimer');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Week {currentWeek}</Text>
          <Text style={styles.subtitle}>You're doing great</Text>
        </View>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.home.thisWeek}</Text>
        <Card onPress={handleModulePress} style={styles.moduleCard}>
          <View style={styles.moduleContent}>
            <Text style={styles.moduleTitle}>{thisWeekModule.title}</Text>
            <Text style={styles.moduleSubtitle}>{thisWeekModule.subtitle}</Text>
            <View style={styles.moduleMeta}>
              <Text style={styles.moduleDuration}>8 min</Text>
              <Text style={styles.moduleArrow}>→</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.home.yourProgress}</Text>
        <Card style={styles.progressCard}>
          <View style={styles.progressContent}>
            <ProgressRing progress={0.35} size={80} />
            <View style={styles.progressText}>
              <Text style={styles.progressCount}>2 of 6</Text>
              <Text style={styles.progressLabel}>{strings.home.modulesCompleted}</Text>
            </View>
          </View>
        </Card>
      </View>

      {shouldShowCheckIn && (
        <View style={styles.section}>
          <Card style={styles.checkInCard} onPress={handleCheckInPress}>
            <View style={styles.checkInContent}>
              <Text style={styles.checkInTitle}>{strings.home.mentalHealthCheckIn}</Text>
              <Text style={styles.checkInSubtitle}>{strings.home.mentalHealthSubtitle}</Text>
              <Button variant="outline" onPress={handleCheckInPress}>
                {strings.home.takeCheckIn}
              </Button>
            </View>
          </Card>
        </View>
      )}

      {shouldShowTimer && (
        <View style={styles.section}>
          <Card style={styles.timerCard} onPress={handleTimerPress}>
            <View style={styles.timerContent}>
              <View>
                <Text style={styles.timerTitle}>{strings.home.contractionTimer}</Text>
                <Text style={styles.timerSubtitle}>{strings.home.contractionTimerSubtitle}</Text>
              </View>
              <Button onPress={handleTimerPress}>
                {strings.home.openTimer}
              </Button>
            </View>
          </Card>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('ModuleLibrary')}
          >
            <Text style={styles.quickActionIcon}>📚</Text>
            <Text style={styles.quickActionText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('LaborStageMap')}
          >
            <Text style={styles.quickActionIcon}>🗺️</Text>
            <Text style={styles.quickActionText}>Labor Stages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('BirthAdvocacy')}
          >
            <Text style={styles.quickActionIcon}>✊</Text>
            <Text style={styles.quickActionText}>Advocacy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: layout.spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: layout.spacing.lg,
    backgroundColor: colors.background,
  },
  greeting: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    marginTop: layout.spacing.xs,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  section: {
    marginTop: layout.spacing.lg,
    paddingHorizontal: layout.screenPadding,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  moduleCard: {
    backgroundColor: colors.primary,
  },
  moduleContent: {
    padding: layout.spacing.lg,
  },
  moduleTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textInverse,
    marginBottom: layout.spacing.xs,
  },
  moduleSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.textInverse,
    opacity: 0.9,
    marginBottom: layout.spacing.md,
  },
  moduleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleDuration: {
    fontSize: typography.sizes.sm,
    color: colors.textInverse,
    opacity: 0.8,
  },
  moduleArrow: {
    fontSize: typography.sizes.lg,
    color: colors.textInverse,
    marginLeft: layout.spacing.md,
  },
  progressCard: {
    backgroundColor: colors.background,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  progressText: {
    marginLeft: layout.spacing.lg,
  },
  progressCount: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  progressLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: layout.spacing.xs,
  },
  checkInCard: {
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning,
  },
  checkInContent: {
    padding: layout.spacing.lg,
    alignItems: 'center',
  },
  checkInTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  checkInSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: layout.spacing.md,
  },
  timerCard: {
    backgroundColor: colors.accent,
  },
  timerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: layout.spacing.lg,
  },
  timerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textInverse,
  },
  timerSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textInverse,
    opacity: 0.9,
    marginTop: layout.spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.background,
    padding: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: layout.spacing.sm,
  },
  quickActionText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
});

export default HomeScreen;
