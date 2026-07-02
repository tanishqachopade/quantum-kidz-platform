import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  getDashboardStats,
} from "../../../services/dashboardService";

import Screen from "../../../components/Screen";

export default function DashboardHomeScreen() {
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <Screen>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Quantum Kidz Overview
      </Text>

      <View style={styles.card}>
        <Text style={styles.number}>
          {stats.totalBranches}
        </Text>

        <Text style={styles.label}>
          Total Branches
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>
          {stats.totalTeachers}
        </Text>

        <Text style={styles.label}>
          Approved Teachers
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>
          {stats.totalParents}
        </Text>

        <Text style={styles.label}>
          Approved Parents
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>
          {stats.pendingApprovals}
        </Text>

        <Text style={styles.label}>
          Pending Approvals
        </Text>
      </View>
    </ScrollView>
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
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  number: {
    fontSize: 32,
    fontWeight: "900",
    color: "#29B6F6",
  },

  label: {
    marginTop: 5,
    color: "#667085",
  },
});