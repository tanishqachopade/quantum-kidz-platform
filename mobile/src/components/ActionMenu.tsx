import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

type MenuOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type Props = {
  options: MenuOption[];
};

export default function ActionMenu({
  options,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          setVisible(true)
        }
      >
        <Text style={styles.dots}>
          ⋮
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() =>
            setVisible(false)
          }
        >
          <View style={styles.menu}>
            {options.map(
              (option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    setVisible(false);
                    option.onPress();
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      option.destructive && {
                        color: "#E53935",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dots: {
    fontSize: 24,
    color: "#1A2332",
    paddingHorizontal: 6,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor:
      "rgba(0,0,0,0.15)",
  },

  menu: {
    marginTop: 110,
    marginRight: 20,

    backgroundColor: "white",

    borderRadius: 18,

    paddingVertical: 8,

    width: 170,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 5,
  },

  item: {
    padding: 16,
  },

  text: {
    fontSize: 16,
    color: "#1A2332",
    fontWeight: "600",
  },
});