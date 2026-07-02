import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  getPendingBranchHeads,
  approveUser,
} from "../../../services/userService";

type User = {
  id: string;
  fullName: string;
  phone: string;
  role: string;
  approvalStatus: string;
  branch?: {
    name: string;
  };
};

export default function BranchHeadApprovalsScreen() {
  const [users, setUsers] = useState<User[]>([]);

  const loadPendingUsers = async () => {
    try {
      const data =
  await getPendingBranchHeads();

setUsers(data);

      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const handleApprove = async (
    userId: string
  ) => {
    try {
      await approveUser(userId);

      Alert.alert(
        "Success",
        "Branch Head Approved"
      );

      await loadPendingUsers();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to approve user"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Pending Branch Heads
      </Text>

      {users.length === 0 && (
        <View style={styles.emptyCard}>
          <Text>
            No pending branch heads.
          </Text>
        </View>
      )}

      {users.map((user) => (
        <View
          key={user.id}
          style={styles.card}
        >
          <Text style={styles.name}>
            {user.fullName}
          </Text>

          <Text style={styles.info}>
            Phone: {user.phone}
          </Text>

          <Text style={styles.info}>
            Branch:{" "}
            {user.branch?.name ??
              "Not Assigned"}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleApprove(user.id)
            }
          >
            <Text style={styles.buttonText}>
              Approve
            </Text>
          </TouchableOpacity>
        </View>
      ))}
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  emptyCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  info: {
    marginBottom: 4,
    color: "#555",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2F80ED",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});