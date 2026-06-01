import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

type Branch = {
  name: string;
  classes: string[];
};

export default function BranchManagementScreen() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      name: "Baner",
      classes: ["Playgroup", "Nursery", "Jr KG", "Sr KG"],
    },
  ]);

  const [branchName, setBranchName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [className, setClassName] = useState("");

  const addBranch = () => {
    if (!branchName.trim()) return;

    setBranches([
      ...branches,
      {
        name: branchName,
        classes: [],
      },
    ]);

    setBranchName("");
  };

  const addClass = () => {
    if (!selectedBranch || !className.trim()) return;

    setBranches(
      branches.map((branch) =>
        branch.name === selectedBranch
          ? {
              ...branch,
              classes: [...branch.classes, className],
            }
          : branch
      )
    );

    setClassName("");
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
            key={branch.name}
            style={[
              styles.branchButton,
              selectedBranch === branch.name &&
                styles.selectedBranch,
            ]}
            onPress={() =>
              setSelectedBranch(branch.name)
            }
          >
            <Text>
              {branch.name}
            </Text>
          </TouchableOpacity>
        ))}

        <TextInput
          placeholder="Class Name"
          value={className}
          onChangeText={setClassName}
          style={styles.input}
        />

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
            key={branch.name}
            style={styles.branchCard}
          >
            <Text style={styles.branchName}>
              {branch.name}
            </Text>

            {branch.classes.map((cls) => (
              <Text
                key={cls}
                style={styles.className}
              >
                • {cls}
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