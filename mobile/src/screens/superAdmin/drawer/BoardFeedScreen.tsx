import React, {
  useState,
  useCallback,
} from "react";


import ScreenHeader from "../../../components/ScreenHeader";

import ConfirmationModal from "../../../components/ConfirmationModal";

import PostCard from "../../../components/PostCard";

import FloatingActionButton from "../../../components/FloatingActionButton";
import Screen from "../../../components/Screen";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  getBoardPosts,
  deletePost,
} from "../../../services/postService";

export default function BoardFeedScreen({
  route,
  navigation,
}: any) {
  const {
    boardId,
    boardTitle,
  } = route.params;

  const [posts, setPosts] =
    useState<any[]>([]);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [selectedPostId, setSelectedPostId] =
  useState("");

  const loadPosts = async () => {
    try {
      const data =
        await getBoardPosts(
          boardId
        );

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
  try {
    await deletePost(selectedPostId);

    setShowDeleteModal(false);

    await loadPosts();
  } catch (error) {
    console.log(error);
  }
};

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [boardId])
  );

  return (
    <Screen>
      <ScreenHeader
  title={boardTitle}
  showBack
/>

      <FlatList
        data={posts}
        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (
  <PostCard
    title={item.title}
    content={item.content}
    onEdit={() =>
      navigation.navigate("PostForm", {
        mode: "edit",
        boardId,
        post: item,
      })
    }
    onDelete={() => {
      setSelectedPostId(item.id);
      setShowDeleteModal(true);
    }}
  />
)}

/>
        

     <ConfirmationModal
    visible={showDeleteModal}
    title="Delete Announcement?"
    message="This announcement will be permanently deleted."
    confirmText="Delete"
    confirmColor="#E53935"
    onCancel={() =>
        setShowDeleteModal(false)
    }
    onConfirm={handleDelete}
/>

      <FloatingActionButton
  onPress={() =>
    navigation.navigate("PostForm", {
      mode: "create",
      boardId,
    })
  }
/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "#F7FBFF",
    padding: 20,
  },


});

