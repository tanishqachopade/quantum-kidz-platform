import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  onPress: () => void;
};

export default function FloatingActionButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
    >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,

    width: 70,
    height: 70,

    borderRadius: 35,

    backgroundColor: "#29B6F6",

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  plus: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
  },
});