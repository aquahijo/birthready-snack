import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography } from '../constants/colors';
import { layout } from '../constants/layout';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  description?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({
  label,
  selected,
  onPress,
  description,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
        {description && (
          <Text style={[styles.description, selected && styles.descriptionSelected]}>
            {description}
          </Text>
        )}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '10',
  },
  content: {
    flex: 1,
    marginRight: layout.spacing.md,
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  labelSelected: {
    color: colors.primary,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: layout.spacing.xs,
  },
  descriptionSelected: {
    color: colors.primaryDark,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

export default OptionCard;
