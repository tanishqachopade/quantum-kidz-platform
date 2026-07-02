import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import ActionMenu from "./ActionMenu";

type Props = {
  title: string;

  content: string;

  onEdit?: () => void;

  onDelete?: () => void;
};

export default function PostCard({
  title,
  content,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        {(onEdit || onDelete) && (
          <ActionMenu
            options={[
              ...(onEdit
                ? [
                    {
                      label: "Edit",
                      onPress: onEdit,
                    },
                  ]
                : []),

              ...(onDelete
                ? [
                    {
                      label: "Delete",
                      destructive: true,
                      onPress: onDelete,
                    },
                  ]
                : []),
            ]}
          />
        )}
      </View>

      <Text style={styles.content}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 3,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 14,
  },

  title: {
    flex: 1,

    fontSize: 20,

    fontWeight: "800",

    color: "#1A2332",

    marginRight: 15,
  },

  content: {
    color: "#667085",

    lineHeight: 22,
  },
});