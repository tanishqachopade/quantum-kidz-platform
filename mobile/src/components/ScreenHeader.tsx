import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Typography } from "../theme/typography";
import { Spacing } from "../theme/spacing";

import {
  useNavigation,
} from "@react-navigation/native";

type Props = {
  title: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  showBack = false,
  rightComponent,
}: Props) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: Spacing.lg,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  backButton: {
    marginRight: 12,

    width: 42,

    height: 42,

    borderRadius: Radius.round,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.surface,

    elevation: 2,
  },

  backText: {
    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,
  },

  title: {
    fontSize: Typography.h1,

    fontWeight: "800",

    color: Colors.text,
  },
});