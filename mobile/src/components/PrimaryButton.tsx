import React from "react";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Typography } from "../theme/typography";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  color = Colors.primary,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled
  ? Colors.disabled
  : color,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    borderRadius: Radius.md,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontSize: Typography.body,
    fontWeight: "700",
  },
});