import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  message: string;
};

export default function EmptyState({
  message,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
  },

  text: {
    color: "#98A2B3",
    fontSize: 16,
  },
});