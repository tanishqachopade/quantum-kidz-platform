import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  visible: boolean;

  title: string;

  message: string;

  icon?: string;

  confirmText: string;

  confirmColor?: string;

  cancelText?: string;

  onCancel: () => void;

  onConfirm: () => void;
};

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText,
  confirmColor = "#E53935",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
icon = "⚠️",
}: Props){
  return (
    <Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={onCancel}
>
      <View style={styles.overlay}>
        <View style={styles.card}>

        <Text
  style={{
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
  }}
>
  {icon}
</Text>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>
    {cancelText}
</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
    styles.confirmButton,
    {
        backgroundColor:
            confirmColor,
    },
]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 26,
    padding: 26,
    shadowColor: "#000",
shadowOpacity: 0.15,
shadowRadius: 20,
shadowOffset: {
  width: 0,
  height: 8,
},
elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A2332",
  },

  message: {
  marginTop: 15,
  color: "#667085",
  lineHeight: 22,
  textAlign: "center",
},

  buttons: {
  flexDirection: "row",
  marginTop: 30,
  gap: 12,
},

cancel: {
  flex: 1,
  backgroundColor: "#EEF2F6",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

confirmButton: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

confirmText: {
  color: "white",
  fontWeight: "700",
},
});