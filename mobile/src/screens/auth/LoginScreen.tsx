import { View, Text, Button, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantum Kidz</Text>

      <Button
        title="Parent Login"
        onPress={() => navigation.navigate("ParentHome")}
      />

      <Button
        title="Teacher Login"
        onPress={() => navigation.navigate("TeacherHome")}
      />

      <Button
        title="Branch Head Login"
        onPress={() => navigation.navigate("BranchHeadHome")}
      />

      <Button
        title="Super Admin Login"
        onPress={() => navigation.navigate("SuperAdminHome")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
});