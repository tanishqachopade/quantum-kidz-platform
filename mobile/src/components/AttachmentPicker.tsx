import * as DocumentPicker from "expo-document-picker";

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import PrimaryButton from "./PrimaryButton";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Spacing } from "../theme/spacing";
import { Typography } from "../theme/typography";

type Props = {
  attachments: any[];

  setAttachments: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

export default function AttachmentPicker({
  attachments,
  setAttachments,
}: Props) {

  const addAttachment = async () => {

    const result =
      await DocumentPicker.getDocumentAsync({
        multiple: false,
      });

    if (result.canceled) return;

    setAttachments((prev) => [
      ...prev,
      result.assets[0],
    ]);
  };

  const removeAttachment = (
    index: number
  ) => {

    setAttachments((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        📎 Attachments
      </Text>

      <PrimaryButton
        title="Add Attachment"
        onPress={addAttachment}
      />

      {attachments.length === 0 && (

        <Text style={styles.empty}>
          No attachments selected.
        </Text>

      )}

      {attachments.map(
        (file, index) => (

          <View
            key={index}
            style={styles.fileCard}
          >

            <Text
              style={styles.fileName}
            >
              📄 {file.name}
            </Text>

            <TouchableOpacity
              onPress={() =>
                removeAttachment(
                  index
                )
              }
            >
              <Text
                style={styles.remove}
              >
                Remove
              </Text>
            </TouchableOpacity>

          </View>

        )
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    marginTop: Spacing.lg,

  },

  heading: {

    fontSize: Typography.body,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: Spacing.sm,

  },

  empty: {

    marginTop: Spacing.md,

    color: Colors.placeholder,

  },

  fileCard: {

    marginTop: Spacing.md,

    backgroundColor: Colors.surface,

    borderRadius: Radius.md,

    padding: Spacing.md,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  fileName: {

    flex: 1,

    color: Colors.text,

  },

  remove: {

    color: Colors.danger,

    fontWeight: "700",

  },

});