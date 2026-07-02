import { createClass, deleteClass } from "../../../services/classService";

import ConfirmationModal from "../../../components/ConfirmationModal";

import { MaterialIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import {
  getBranches,
  createBranch,
  deleteBranch,
} from "../../../services/branchService";

const CLASS_OPTIONS = [
  "PLAYGROUP",
  "NURSERY",
  "JR_KG",
  "SR_KG",
];

type Branch = {
  id: string;
  name: string;
  classes: {
  id: string;
  type: string;
}[];
};

export default function BranchManagementScreen() {
  const [branches, setBranches] = useState<Branch[]>([]);

  const [branchName, setBranchName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedClass, setSelectedClass] =
  useState("PLAYGROUP");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] =
  useState(false);

const [branchToDelete, setBranchToDelete] =
  useState<Branch | null>(null);

  const [classToDelete, setClassToDelete] =
  useState<{
    id: string;
    type: string;
  } | null>(null);

const [deleteClassModalVisible, setDeleteClassModalVisible] =
  useState(false);

  const loadBranches = async () => {
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const addBranch = async () => {
    if (!branchName.trim()) return;

    try {
      await createBranch(branchName);

      setErrorMessage("");

      setBranchName("");

      await loadBranches();

      Alert.alert("Success", "Branch created");
    } catch (error: any) {
      console.log(error);

      setErrorMessage(
        error.message || "Could not create branch"
      );
    }
  };

  const addClass = async () => {
  if (!selectedBranch) {
    Alert.alert(
      "Select Branch",
      "Please select a branch first."
    );
    return;
  }

  try {
    await createClass(
      selectedBranch,
      selectedClass
    );

    await loadBranches();

    Alert.alert(
      "Success",
      "Class created"
    );
  } catch (error: any) {
    Alert.alert(
      "Error",
      error.message
    );
  }
};

const openDeleteClassModal = (
  cls: {
    id: string;
    type: string;
  }
) => {
  setClassToDelete(cls);
  setDeleteClassModalVisible(true);
};

const confirmDeleteClass = async () => {
  if (!classToDelete) return;

  try {
    await deleteClass(classToDelete.id);

    await loadBranches();

    setDeleteClassModalVisible(false);
    setClassToDelete(null);
  } catch (error) {
    console.log(error);
  }
};

const openDeleteModal = (branch: Branch) => {
  setBranchToDelete(branch);
  setDeleteModalVisible(true);
};

const confirmDeleteBranch = async () => {
  if (!branchToDelete) return;

  try {
    await deleteBranch(branchToDelete.id);

    await loadBranches();

    setDeleteModalVisible(false);
    setBranchToDelete(null);

    Alert.alert(
      "Success",
      "Branch deleted successfully."
    );
  } catch (error: any) {
    Alert.alert(
      "Error",
      error.message || "Failed to delete branch."
    );
  }
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Branch & Class Management
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Create New Branch
        </Text>

        <TextInput
          placeholder="Branch Name"
          value={branchName}
          onChangeText={setBranchName}
          style={styles.input}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={addBranch}
        >
          <Text style={styles.buttonText}>
            Add Branch
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Add Class To Branch
        </Text>

        {branches.map((branch) => (
          <TouchableOpacity
            key={branch.id}
            style={[
              styles.branchButton,
              selectedBranch === branch.id &&
                styles.selectedBranch,
            ]}
            onPress={() =>
              setSelectedBranch(branch.id)
            }
          >
            <Text>{branch.name}</Text>
          </TouchableOpacity>
        ))}

        <Text
  style={{
    marginBottom: 10,
    fontWeight: "600",
  }}
>
  Select Class
</Text>

{CLASS_OPTIONS.map((option) => (
  <TouchableOpacity
    key={option}
    style={[
      styles.branchButton,
      selectedClass === option &&
        styles.selectedBranch,
    ]}
    onPress={() =>
      setSelectedClass(option)
    }
  >
    <Text>{option}</Text>
  </TouchableOpacity>
))}

        <TouchableOpacity
          style={styles.button}
          onPress={addClass}
        >
          <Text style={styles.buttonText}>
            Add Class
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Existing Structure
        </Text>

       {branches.map((branch) => (
  <View
    key={branch.id}
    style={styles.branchCard}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <Text style={styles.branchName}>
        {branch.name}
      </Text>

      <TouchableOpacity
        onPress={() => openDeleteModal(branch)}
      >
        <MaterialIcons
  name="delete-outline"
  size={24}
  color="#E53935"
/>
      </TouchableOpacity>
    </View>

    {branch.classes?.map((cls) => (
      <View
  key={cls.id}
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12,
    marginBottom: 6,
  }}
>
  <Text>
    • {cls.type}
  </Text>

  <TouchableOpacity
    onPress={() =>
      openDeleteClassModal(cls)
    }
  >
    <MaterialIcons
      name="delete-outline"
      size={20}
      color="#E53935"
    />
  </TouchableOpacity>
</View>
    ))}
  </View>
))}
      </View>


           <ConfirmationModal
        visible={deleteModalVisible}
        icon="🗑️"
        title="Delete Branch"
        message={
          branchToDelete
            ? `Are you sure you want to permanently delete "${branchToDelete.name}"?\n\nThis will delete:\n\n• All classes\n• Branch board\n• Class boards\n• Announcements\n\nThis action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        confirmColor="#E53935"
        onCancel={() => {
          setDeleteModalVisible(false);
          setBranchToDelete(null);
        }}
        onConfirm={confirmDeleteBranch}
      />

      <ConfirmationModal
        visible={deleteClassModalVisible}
        icon="🗑️"
        title="Delete Class"
        message={
          classToDelete
            ? `Are you sure you want to permanently delete "${classToDelete.type}"?\n\nThis will delete:\n\n• Class Board\n• All announcements\n\nThis action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        confirmColor="#E53935"
        onCancel={() => {
          setDeleteClassModalVisible(false);
          setClassToDelete(null);
        }}
        onConfirm={confirmDeleteClass}
      />

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
    padding: 16,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D6E2F0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  errorText: {
    color: "red",
    marginBottom: 12,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2F80ED",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  branchButton: {
    backgroundColor: "#F2F5F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  selectedBranch: {
    borderWidth: 2,
    borderColor: "#2F80ED",
  },

  branchCard: {
    marginBottom: 14,
  },

  branchName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  className: {
    marginLeft: 12,
    marginBottom: 2,
  },
});