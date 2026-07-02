import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  attachment: any;
};

export default function AttachmentPreview({
  attachment,
}: Props) {

  if (!attachment)
    return null;

  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        Selected Attachment
      </Text>

      <Text>
        {attachment.name ??
          attachment.fileName}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {

    backgroundColor: "white",

    padding: 15,

    borderRadius: 15,

    marginVertical: 20,
  },

  title: {

    fontWeight: "700",

    marginBottom: 8,
  },
});