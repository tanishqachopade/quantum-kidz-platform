import React, {
  useState,
} from "react";

import {
  StyleSheet,
  Alert,
} from "react-native";

import {
  createPost,
  updatePost,
} from "../../../services/postService";

import Screen from "../../../components/Screen";

import ScreenHeader from "../../../components/ScreenHeader";
import PrimaryButton from "../../../components/PrimaryButton";

import AttachmentPicker from "../../../components/AttachmentPicker";


import TextField from "../../../components/TextField";
import TextArea from "../../../components/TextArea";

export default function PostFormScreen({
  route,
  navigation,
}: any) {
 const {
  boardId,
  mode,
  post,
} = route.params;

  const [title, setTitle] =
  useState(
    mode === "edit"
      ? post.title
      : ""
  );

  const [attachments, setAttachments] =
useState<any[]>([]);



const [content, setContent] =
  useState(
    mode === "edit"
      ? post.content
      : ""
  );

  const handlePost = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Error", "Content is required");
      return;
    }

    if (mode === "create") {
  await createPost(
    title.trim(),
    content.trim(),
    boardId
  );
} else {
  await updatePost(
    post.id,
    title.trim(),
    content.trim()
  );
}

setTitle("");
setContent("");

navigation.goBack();
  };

  return (
    <Screen>
      <ScreenHeader
  title={
    mode === "edit"
      ? "Edit Post"
      : "Create Post"
  }
  showBack
/>
      <TextField
  label="Title"
  placeholder="Enter announcement title"
  value={title}
  onChangeText={setTitle}
/>

      <TextArea
  label="Announcement"
  placeholder="Write your announcement here"
  value={content}
  onChangeText={setContent}
/>

<AttachmentPicker
    attachments={attachments}
    setAttachments={
        setAttachments
    }
/>


      <PrimaryButton
    title={
        mode === "edit"
            ? "Save Changes"
            : "Publish"
    }
    onPress={handlePost}
/>
    </Screen>
  );
}

const styles = StyleSheet.create({
});