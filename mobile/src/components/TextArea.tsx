import React from "react";

import {
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Typography } from "../theme/typography";
import { Spacing } from "../theme/spacing";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;

  editable?: boolean;
};

export default function TextArea({
  label,
  placeholder,
  value,
  onChangeText,
  editable = true,
}: Props) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        multiline
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        style={styles.input}
        textAlignVertical="top"
        placeholderTextColor={Colors.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.text,
  },

  input: {
    backgroundColor: Colors.surface,

    borderRadius: Radius.md,

    padding: Spacing.md,

    minHeight: 180,

    fontSize: Typography.body,

    borderWidth: 1,

    borderColor: Colors.border,
  },
});