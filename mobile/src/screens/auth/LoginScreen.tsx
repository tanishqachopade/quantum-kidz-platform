import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

import { COLORS } from "../../constants/colors";

const ROLES = [
  {
    key: "Parent",
    label: "Parent",
    sub: "View updates",
    icon: "👨‍👩‍👧",
    iconBg: "#e8f4ff",
    route: "ParentHome",
  },
  {
    key: "Teacher",
    label: "Teacher",
    sub: "Manage class",
    icon: "👩‍🏫",
    iconBg: "#e8fff2",
    route: "TeacherHome",
  },
  {
    key: "BranchHead",
    label: "Branch Head",
    sub: "Branch admin",
    icon: "🏫",
    iconBg: "#fff3e0",
    route: "BranchHeadHome",
  },
  {
    key: "SuperAdmin",
    label: "Super Admin",
    sub: "All branches",
    icon: "⚛️",
    iconBg: "#f5e8ff",
    route: "SuperAdminHome",
  },
] as const;

const STARS = [
  { top: "12%", left: "8%",  size: 5, opacity: 0.40 },
  { top: "20%", left: "80%", size: 4, opacity: 0.35 },
  { top: "8%",  left: "50%", size: 6, opacity: 0.30 },
  { top: "35%", left: "90%", size: 4, opacity: 0.30 },
  { top: "40%", left: "15%", size: 5, opacity: 0.25 },
  { top: "15%", left: "65%", size: 3, opacity: 0.30 },
];

type RoleKey = typeof ROLES[number]["key"];

export default function LoginScreen({ navigation }: any) {
  const [selectedRole, setSelectedRole] = useState<RoleKey>("Parent");
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    navigation.navigate("OtpVerify", { phone, role: selectedRole });
  };

  // For dev — tap role card directly to navigate
  const handleRolePress = (role: typeof ROLES[number]) => {
    setSelectedRole(role.key);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f0f7ff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Top wave header ── */}
        <LinearGradient
          colors={["#5CC8FF", "#1a90d8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Stars */}
          {STARS.map((s, i) => (
            <View
              key={i}
              style={[styles.star, {
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                opacity: s.opacity,
              }]}
            />
          ))}

          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>LEARN • EXPLORE • THRIVE</Text>

          {/* Wave cutout */}
          <Svg
            viewBox="0 0 390 36"
            style={styles.waveSvg}
            preserveAspectRatio="none"
          >
            <Path
              d="M0,12 C100,36 290,0 390,18 L390,36 L0,36 Z"
              fill="#f0f7ff"
            />
          </Svg>
        </LinearGradient>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Role selector */}
          <Text style={styles.sectionLabel}>I am a...</Text>
          <View style={styles.roleGrid}>
            {ROLES.map((role) => {
              const active = selectedRole === role.key;
              return (
                <TouchableOpacity
                  key={role.key}
                  style={[styles.roleCard, active && styles.roleCardActive]}
                  onPress={() => handleRolePress(role)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.roleIcon, { backgroundColor: role.iconBg }]}>
                    <Text style={styles.roleEmoji}>{role.icon}</Text>
                  </View>
                  <Text style={[styles.roleName, active && styles.roleNameActive]}>
                    {role.label}
                  </Text>
                  <Text style={styles.roleSub}>{role.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Phone input */}
          <Text style={styles.sectionLabel}>Mobile Number</Text>
          <View style={styles.inputRow}>
            <View style={styles.countryChip}>
              <Text style={styles.countryText}>+91</Text>
            </View>
            <View style={styles.inputDivider} />
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your number"
              placeholderTextColor="#b0cce0"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Send OTP */}
          <Pressable
            style={({ pressed }) => [
              styles.otpBtn,
              pressed && { opacity: 0.88 },
              phone.length < 10 && styles.otpBtnDisabled,
            ]}
            onPress={handleSendOtp}
          >
            <Text style={styles.otpBtnText}>Send OTP 🚀</Text>
          </Pressable>

          {/* Secure note */}
          <View style={styles.secureRow}>
            <Text style={styles.secureText}>
              🔒  OTP sent via SMS · Admin-verified accounts only
            </Text>
          </View>

          {/* Mascots */}
          <View style={styles.mascotsRow}>
            <Image
              source={require("../../assets/images/both_mascots.png")}
              style={styles.mascots}
              resizeMode="contain"
            />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  /* Header */
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    position: "relative",
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 99,
  },
  logo: {
    width: 220,
    height: 90,
    zIndex: 2,
  },
  tagline: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.88)",
    letterSpacing: 1.5,
    zIndex: 2,
    marginTop: 2,
  },
  waveSvg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    width: "100%",
  },

  /* Body */
  body: {
    flex: 1,
    padding: 20,
    paddingTop: 16,
    gap: 12,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8aabca",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  /* Role grid */
  roleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  roleCard: {
    width: "47%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    gap: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  roleCardActive: {
    borderColor: "#29B6F6",
    backgroundColor: "#e8f7ff",
  },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roleEmoji: {
    fontSize: 20,
  },
  roleName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1a2332",
    textAlign: "center",
  },
  roleNameActive: {
    color: "#1a5fa8",
  },
  roleSub: {
    fontSize: 10,
    color: "#8aabca",
    fontWeight: "600",
    textAlign: "center",
  },

  /* Input */
  inputRow: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: "#c9dff5",
  },
  countryChip: {
    backgroundColor: "#e8f4ff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countryText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1a5fa8",
  },
  inputDivider: {
    width: 1,
    height: 18,
    backgroundColor: "#c9dff5",
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1a2332",
    padding: 0,
  },

  /* OTP button */
  otpBtn: {
    backgroundColor: "#f4921e",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  otpBtnDisabled: {
    opacity: 0.5,
  },
  otpBtnText: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: 0.2,
  },

  /* Secure note */
  secureRow: {
    alignItems: "center",
  },
  secureText: {
    fontSize: 11,
    color: "#a0bccc",
    fontWeight: "600",
    textAlign: "center",
  },

  /* Mascots */
  mascotsRow: {
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 8,
  },
  mascots: {
    width: 180,
    height: 140,
  },
});