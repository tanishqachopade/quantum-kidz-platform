import React from "react";

import {
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#29B6F6"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },
});