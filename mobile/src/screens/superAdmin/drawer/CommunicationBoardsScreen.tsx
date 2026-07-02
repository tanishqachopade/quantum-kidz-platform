import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

import { getBoards } from "../../../services/boardService";

import ScreenHeader from "../../../components/ScreenHeader";

import BoardCard from "../../../components/BoardCard";
import Screen from "../../../components/Screen";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type Board = {
  id: string;
  title: string;
  type: string;
};

export default function CommunicationBoardsScreen({
  navigation,
}: any) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 useFocusEffect(
  useCallback(() => {
    loadBoards();
  }, [])
);

  if (loading) {
    return (
      <Screen>
        <Text>Loading boards...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader
  title="Communication Boards"
/>

      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BoardCard
    title={item.title}
    subtitle="Tap to open board"
    onPress={() =>
        navigation.navigate(
            "BoardFeed",
            {
                boardId: item.id,
                boardTitle: item.title,
            }
        )
    }
/>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({


});