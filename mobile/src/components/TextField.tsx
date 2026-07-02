import React from "react";
import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Typography } from "../theme/typography";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Spacing } from "../theme/spacing";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;

  multiline?: boolean;
  numberOfLines?: number;

  editable?: boolean;
};

export default function TextField({ label, placeholder, value, onChangeText, multiline = false, numberOfLines = 1, editable = true, }: Props){
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

     <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    style={[
        styles.input,
        multiline && styles.multiline,
    ]}
    multiline={multiline}
    numberOfLines={numberOfLines}
    editable={editable}
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

    fontSize: Typography.body,

    borderWidth: 1,

    borderColor: Colors.border,
  },

  multiline: {
    minHeight: 160,
},

});