import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

import { BOARDS } from "../../../data/mockBoards";

export default function CommunicationBoardsScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Communication Boards
      </Text>

      <FlatList
        data={BOARDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("BoardFeed", {
                boardId: item.id,
                boardTitle: item.title,
              })
            }
          >
            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.cardSubtitle}>
              Tap to open board
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFF",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#1A2332",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A2332",
  },

  cardSubtitle: {
    marginTop: 6,
    color: "#7A8CA5",
  },
});