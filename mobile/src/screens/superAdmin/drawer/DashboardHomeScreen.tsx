import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function DashboardHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Quantum Kidz Overview
      </Text>

      <View style={styles.card}>
        <Text style={styles.number}>5</Text>
        <Text style={styles.label}>
          Total Branches
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>487</Text>
        <Text style={styles.label}>
          Total Students
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>42</Text>
        <Text style={styles.label}>
          Total Teachers
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>3</Text>
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