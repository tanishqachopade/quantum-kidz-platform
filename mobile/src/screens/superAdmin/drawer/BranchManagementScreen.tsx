import { createClass } from "../../../services/classService";

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
            <Text style={styles.branchName}>
              {branch.name}
            </Text>

            {branch.classes?.map((cls) => (
              <Text
                key={cls.id}
                style={styles.className}
              >
                • {cls.type}
              </Text>
            ))}
          </View>
        ))}
      </View>
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