import React from "react";

import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export default function BoardCard({
  title,
  subtitle,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderRadius: 20,

    padding: 20,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 3,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: "#1A2332",
  },

  subtitle: {
    marginTop: 6,

    color: "#667085",
  },
});